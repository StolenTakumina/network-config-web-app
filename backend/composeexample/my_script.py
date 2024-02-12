def process_data(data):
    if not data or not data[0].get('interfacesList'):
        return "No valid data provided."

    all_config_lines = []

    for device_data in data:
        config_lines = []

        separator = "***********************************\n"
        device_info = f"******** {device_data['device']} {device_data.get('hostname', '')} ********\n"
        config_lines.extend([separator, device_info, separator])

        config_lines.extend([
            "en",
            "conf terminal",
        ])

        if 'hostname' in device_data:
            config_lines.append(f"hostname {device_data['hostname']}")
        if 'secret' in device_data:
            config_lines.append(f"enable secret {device_data['secret']}")
        if 'banner' in device_data:
            config_lines.append(f"banner motd ${device_data['banner']}$")
        if 'consolePass' in device_data:
            config_lines.extend([
                "line console 0",
                f"password {device_data['consolePass']}",
            ])
        else:
            config_lines.append("line console 0")

        config_lines.extend([
            "login",
            "logging synchronous",
            "exit",
        ])

        if device_data.get('defaultGateway'):
            config_lines.append(f"ip default-gateway {device_data['defaultGateway']}")
        if device_data.get('passwordEncryption'):
            config_lines.append(f"service password-encryption")

        for interface_data in device_data['interfacesList']:
            if 'ip' in interface_data and 'subnet' in interface_data:
                config_lines.extend([
                    f"interface {interface_data['name']}{interface_data['id']}",
                    f"ip address {interface_data['ip']} {interface_data['subnet']}",
                    f"description {interface_data.get('description', '')}",
                    "no shutdown",
                    "exit"
                ])

        if device_data.get('accessPort'):
            for ap_data in device_data['accessPort']:
                config_lines.extend([
                    f"interface {ap_data['apInterface']}",
                    f"switchport mode access",
                    f"switchport access vlan {ap_data['vlanID']}",
                    f"description {ap_data.get('description', '')}",
                    "no shutdown",
                    "exit"
                ])
        if device_data.get('trunkPort'):
            for tp_data in device_data['trunkPort']:
                config_lines.extend([
                    f"interface {tp_data['tpInterface']}",
                    f"switchport mode trunk",
                    f"switchport trunk allowed vlan {tp_data['vlanRange']}",
                    f"description {tp_data.get('description', '')}",
                    "no shutdown",
                    "exit"
                ])

        if device_data.get('staticRoute'):
            for sr_data in device_data['staticRoute']:
                config_lines.extend([
                    f"ip route {sr_data['destination']} {sr_data['mask']} {sr_data['nextHop']}",
                ])

        if device_data.get('dhcpServer'):
            for dhcp_data in device_data['dhcpServer']:
                config_lines.extend([
                    f"ip dhcp pool {dhcp_data['poolName']}",
                    f"network {dhcp_data['dhcpNetwork']}",
                    f"default-router {dhcp_data['defaultRouter']}",
                    f"dns-server {dhcp_data['dns']}",
                    "exit"
                ])

        if device_data.get('ssh'):
            ssh_data = device_data['ssh'][0]
            config_lines.extend([
                f"ip domain-name {ssh_data['domainName']}",
                f"username {ssh_data['username']} privilege 15 secret {ssh_data['password']}"
                f"crypto key generate rsa general-keys modulus {ssh_data['modulus']}"])
            if ssh_data['version2']:
                config_lines.append("ip ssh version 2")
            config_lines.extend([f"line vty 0 4",
            f"transport input ssh" ])


        if device_data.get('passwordEncryption'):
            config_lines.append("service password-encryption")

        config_lines.extend(["exit", "write"])
        all_config_lines.append("\n".join(config_lines))

    return "\n\n".join(all_config_lines)
