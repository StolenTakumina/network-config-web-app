def process_data(data):
    if not data or not data[0]['interfacesList']:
        return "No valid data provided."
    config_lines = []
    for router_data in data:
        separator = "***********************************\n"
        device_info = f"******** {router_data['device']} {router_data.get('hostname', '')} ********\n"
        config_lines.extend([separator, device_info, separator])

        config_lines.extend([
            "en",
            "conf terminal",
        ])

        if 'device' in router_data:
            config_lines.append(f"hostname {router_data['hostname']}")
        if 'secret' in router_data:
            config_lines.append(f"enable secret {router_data['secret']}")
        if 'banner' in router_data:
            config_lines.append(f"banner motd ${router_data['banner']}$")
        if 'consolePass' in router_data:
            config_lines.extend([
                "line console 0",
                f"password {router_data['consolePass']}",
            ])

        config_lines.extend([
            "login",
            "logging synchronous",
            "exec-timeout 60",
            "exit",
            "",
            "line vty 0 4",
            "password cisco12345",
            "transport input ssh",
            "login local",
            "logging synchronous",
            "exec-timeout 60",
            "exit",
            "",
        ])

        for interface_data in router_data['interfacesList']:
            if 'ip' in interface_data and 'subnet' in interface_data:
                config_lines.extend([
                    f"interface {interface_data['name']}",
                    f"ip address {interface_data['ip']} {interface_data['subnet']}",
                    f"description {interface_data.get('description', '')}",
                    "no shutdown",
                    "exit"
                ])
        if router_data.get('ssh'):
            ssh_data = router_data['ssh'][0]  # Assuming only one SSH configuration for simplicity
            config_lines.extend([
                "ip ssh version 2",
                "ip ssh time-out 120",
                f"username {ssh_data['username']} privilege 15 secret {ssh_data['password']}",
                f"domain-name {ssh_data['domainName']}",
            ])

        if router_data.get('passwordEncryption'):
            config_lines.extend(["service password-encryption"])

        config_lines.extend(["exit", "write"])
    return "\n".join(config_lines)
