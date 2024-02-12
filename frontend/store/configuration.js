export const state = () => ({
  finalJSON: {},
  devicesList: [],
  lastDeviceID: 0,
  lastInterfaceID: 0,
});

export const getters = {
  getFinalJSON: (state) => state.finalJSON,
  getInterfaces: (state) => (id) => state.devicesList[id].interfacesList,
  getDevices: (state) => state.devicesList,
  getDeviceType: (state) => (id) => state.devicesList[id].device,
};

export const actions = {
  setFinalJSON({ commit }, payload) {
    commit("SET_FINAL_JSON", payload);
  },
  setDevice({ commit }, { id, device }) {
    commit("SET_DEVICE", { id, device });
  },
  setHostname({ commit }, { id, hostname }) {
    commit("SET_HOSTNAME", { id, hostname });
  },
  setDefaultGateway({ commit }, { id, gateway }) {
    commit("SET_DEFAULT_GATEWAY", { id, gateway });
  },
  addInterface({ commit }, id) {
    commit("ADD_INTERFACE", id);
  },
  removeInterface({ commit }, index) {
    commit("REMOVE_INTERFACE", index);
  },
  setInterfaceName({ commit }, { index, name, id }) {
    commit("SET_INTERFACE_NAME", { index, name, id });
  },
  setInterfaceID({ commit }, { index, intID, id }) {
    commit("SET_INTERFACE_ID", { index, intID, id });
  },
  setBanner({ commit }, { id, banner }) {
    commit("SET_BANNER", { id, banner });
  },
  setSecret({ commit }, { id, secret }) {
    commit("SET_SECRET", { id, secret });
  },
  setConsolePass({ commit }, { id, console }) {
    commit("SET_CONSOLE_PASS", { id, console });
  },
  setPasswordEncryption({ commit }, { id, encryption }) {
    commit("SET_PASSWORD_ENCRYPTION", { id, encryption });
  },
  setIPAddress({ commit }, { index, ip, id }) {
    commit("SET_IP_ADDRESS", { index, ip, id });
  },
  setSubnetMask({ commit }, { index, mask, id }) {
    commit("SET_SUBNET_MASK", { index, mask, id });
  },
  setDescription({ commit }, { index, description, id }) {
    commit("SET_DESCRIPTION", { index, description, id });
  },
  setSSHModule({ commit }, { id, ssh }) {
    commit("SET_SSH_MODULE", { id, ssh });
  },
  setSSHModulus({ commit }, { id, modulus }) {
    commit("SET_SSH_MODULUS", { id, modulus });
  },
  setAccessPortModule({ commit }, { id, accessPort }) {
    commit("SET_ACCESS_PORT_MODULE", { id, accessPort });
  },
  setAPInterface({ commit }, { id, apInterface }) {
    commit("SET_AP_INTERFACE", { id, apInterface });
  },
  setAPDescription({ commit }, { id, description }) {
    commit("SET_AP_DESCRIPTION", { id, description });
  },
  setVLANID({ commit }, { id, vlanID }) {
    commit("SET_VLAN_ID", { id, vlanID });
  },
  setTrunkPortModule({ commit }, { id, trunkPort }) {
    commit("SET_TRUNK_PORT_MODULE", { id, trunkPort });
  },
  setTPInterface({ commit }, { id, tpInterface }) {
    commit("SET_TP_INTERFACE", { id, tpInterface });
  },
  setTPDescription({ commit }, { id, description }) {
    commit("SET_TP_DESCRIPTION", { id, description });
  },
  setVLANRange({ commit }, { id, vlanRange }) {
    commit("SET_VLAN_RANGE", { id, vlanRange });
  },
  setStaticRouteModule({ commit }, { id, sr }) {
    commit("SET_STATIC_ROUTE_MODULE", { id, sr });
  },
  setDestination({ commit }, { id, destination }) {
    commit("SET_DESTINATION", { id, destination });
  },
  setSRSubnetMask({ commit }, { id, subnetMask }) {
    commit("SET_SR_SUBNET_MASK", { id, subnetMask });
  },
  setNextHop({ commit }, { id, nextHop }) {
    commit("SET_NEXT_HOP", { id, nextHop });
  },
  setDHCPServerModule({ commit }, { id, dhcp }) {
    commit("SET_DHCP_SERVER_MODULE", { id, dhcp });
  },
  setPoolName({ commit }, { id, poolName }) {
    commit("SET_POOL_NAME", { id, poolName });
  },
  setDHCPNetwork({ commit }, { id, dhcpNetwork }) {
    commit("SET_DHCP_NETWORK", { id, dhcpNetwork });
  },
  setDefaultRouter({ commit }, { id, defaultRouter }) {
    commit("SET_DEFAULT_ROUTER", { id, defaultRouter });
  },
  setDNS({ commit }, { id, dns }) {
    commit("SET_DNS", { id, dns });
  },
  addDevice({ commit }) {
    commit("ADD_DEVICE");
  },
  setDomainName({ commit }, { id, domain }) {
    commit("SET_DOMAIN_NAME", { id, domain });
  },
  setSSHUsername({ commit }, { id, username }) {
    commit("SET_SSH_USERNAME", { id, username });
  },
  setSSHPassword({ commit }, { id, password }) {
    commit("SET_SSH_PASSWORD", { id, password });
  },
  setSSHVersion({ commit }, { id, version2 }) {
    commit("SET_SSH_VERSION", { id, version2 });
  },
  removeDevice({ commit }, id) {
    commit("REMOVE_DEVICE", id);
  },
  async exportConfig({ commit, state }) {
    commit("SET_FINAL_JSON");
    const url = "http://localhost:8000/process/";
    const file = "config.txt";
    try {
      const data = await this.$axios
        .post(url, state.finalJSON)
        .then((response) => {
          const url = window.URL.createObjectURL(
            new Blob([response.data.result])
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", file);
          document.body.appendChild(link);
          link.click();
          return response.data.result;
        });
      console.log(data);
      commit("RESET_FINAL_JSON");
    } catch (e) {
      console.error("Error while download:", e);
    }
  },
};
export const mutations = {
  SET_CONSOLE_PASS(state, { id, console }) {
    state.devicesList[id].consolePass = console;
  },

  SET_FINAL_JSON(state) {
    state.finalJSON = state.devicesList;
  },
  ADD_DEVICE(state) {
    const device = {
      id: state.lastDeviceID++,
      device: "",
      hostname: "",
      interfacesList: [],
      defaultGateway: "",
      banner: "",
      secret: "",
      passwordEncryption: false,
      ssh: [],
      accessPort: [],
      trunkPort: [],
      staticRoute: [],
      dhcpServer: [],
    };
    state.devicesList.push(device);
  },

  SET_DEVICE(state, { id, device }) {
    state.devicesList[id].device = device;
  },
  SET_HOSTNAME(state, { id, hostname }) {
    state.devicesList[id].hostname = hostname;
  },
  SET_DEFAULT_GATEWAY(state, { id, gateway }) {
    state.devicesList[id].defaultGateway = gateway;
  },
  ADD_INTERFACE(state, id) {
    state.devicesList[id].interfacesList.push({
      intListID: state.lastInterfaceID++,
      name: "",
      id: "",
      ip: "",
      subnet: "",
      description: "",
    });
  },
  REMOVE_INTERFACE(state, { index, id }) {
    state.devicesList[id].interfacesList.splice(index, 1);
  },

  SET_BANNER(state, { id, banner }) {
    state.devicesList[id].banner = banner;
  },
  SET_SECRET(state, { id, secret }) {
    state.devicesList[id].secret = secret;
  },
  SET_PASSWORD_ENCRYPTION(state, { id, encryption }) {
    state.devicesList[id].passwordEncryption = encryption;
  },
  SET_INTERFACE_NAME(state, { index, name, id }) {
    state.devicesList[id].interfacesList[index].name = name;
  },
  SET_INTERFACE_ID(state, { index, intID, id }) {
    state.devicesList[id].interfacesList[index].id = intID;
  },
  SET_IP_ADDRESS(state, { index, ip, id }) {
    state.devicesList[id].interfacesList[index].ip = ip;
  },
  SET_SUBNET_MASK(state, { index, mask, id }) {
    state.devicesList[id].interfacesList[index].subnet = mask;
  },
  SET_DESCRIPTION(state, { index, description, id }) {
    state.devicesList[id].interfacesList[index].description = description;
  },

  SET_SSH_MODULE(state, { id, ssh }) {
    const sshModule = {
      domainName: "",
      username: "",
      password: "",
      modulus: "",
      version2: false,
    };
    if (ssh) {
      state.devicesList[id].ssh.push(sshModule);
    } else {
      state.devicesList[id].ssh.pop();
    }
  },
  SET_ACCESS_PORT_MODULE(state, { id, accessPort }) {
    const accessPortModule = {
      apInterface: "",
      description: "",
      vlanID: "",
    };
    if (accessPort) {
      state.devicesList[id].accessPort.push(accessPortModule);
    } else {
      state.devicesList[id].accessPort.pop();
    }
  },
  SET_AP_INTERFACE(state, { id, apInterface }) {
    state.devicesList[id].accessPort[0].apInterface = apInterface.value;
  },
  SET_AP_DESCRIPTION(state, { id, description }) {
    state.devicesList[id].accessPort[0].description = description.value;
  },
  SET_VLAN_ID(state, { id, vlanID }) {
    state.devicesList[id].accessPort[0].vlanID = vlanID.value;
  },
  SET_TP_INTERFACE(state, { id, tpInterface }) {
    state.devicesList[id].trunkPort[0].tpInterface = tpInterface.value;
  },
  SET_TRUNK_PORT_MODULE(state, { id, trunkPort }) {
    const trunkPortModule = {
      tpInterface: "",
      description: "",
      vlanRange: "",
    };
    if (trunkPort) {
      state.devicesList[id].trunkPort.push(trunkPortModule);
    } else {
      state.devicesList[id].trunkPort.pop();
    }
  },
  SET_TP_DESCRIPTION(state, { id, description }) {
    state.devicesList[id].trunkPort[0].description = description.value;
  },
  SET_VLAN_RANGE(state, { id, vlanRange }) {
    state.devicesList[id].trunkPort[0].vlanRange = vlanRange.value;
  },
  SET_STATIC_ROUTE_MODULE(state, { id, sr }) {
    const staticRouteModule = {
      destination: "",
      mask: "",
      nextHop: "",
    };
    if (sr) {
      state.devicesList[id].staticRoute.push(staticRouteModule);
    } else {
      state.devicesList[id].staticRoute.pop();
    }
  },
  SET_DESTINATION(state, { id, destination }) {
    state.devicesList[id].staticRoute[0].destination = destination.value;
  },
  SET_SR_SUBNET_MASK(state, { id, subnetMask }) {
    state.devicesList[id].staticRoute[0].mask = subnetMask.value;
  },
  SET_NEXT_HOP(state, { id, nextHop }) {
    state.devicesList[id].staticRoute[0].nextHop = nextHop.value;
  },
  SET_DHCP_SERVER_MODULE(state, { id, dhcp }) {
    const dhcpServerModule = {
      poolName: "",
      dhcpNetwork: "",
      defaultRouter: "",
      dns: "",
    };
    if (dhcp) {
      state.devicesList[id].dhcpServer.push(dhcpServerModule);
    } else {
      state.devicesList[id].dhcpServer.pop();
    }
  },
  SET_POOL_NAME(state, { id, poolName }) {
    state.devicesList[id].dhcpServer[0].poolName = poolName.value;
  },
  SET_DHCP_NETWORK(state, { id, dhcpNetwork }) {
    state.devicesList[id].dhcpServer[0].dhcpNetwork = dhcpNetwork.value;
  },
  SET_DEFAULT_ROUTER(state, { id, defaultRouter }) {
    state.devicesList[id].dhcpServer[0].defaultRouter = defaultRouter.value;
  },
  SET_DNS(state, { id, dns }) {
    state.devicesList[id].dhcpServer[0].dns = dns.value;
  },
  SET_DOMAIN_NAME(state, { id, domain }) {
    state.devicesList[id].ssh[0].domainName = domain.value;
  },
  SET_SSH_USERNAME(state, { id, username }) {
    state.devicesList[id].ssh[0].username = username.value;
  },
  SET_SSH_PASSWORD(state, { id, password }) {
    state.devicesList[id].ssh[0].password = password.value;
  },
  SET_SSH_VERSION(state, { id, version2 }) {
    state.devicesList[id].ssh[0].version2 = version2;
  },
  SET_SSH_MODULUS(state, { id, modulus }) {
    state.devicesList[id].ssh[0].modulus = modulus;
  },
  REMOVE_DEVICE(state, id) {
    state.devicesList.splice(id, 1);
  },
  RESET_FINAL_JSON(state) {
    state.finalJSON = {};
  },
};
