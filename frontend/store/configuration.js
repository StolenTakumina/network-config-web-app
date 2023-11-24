export const state = () => ({
  finalJSON: {},
  devicesList: [],
});

export const getters = {
  getFinalJSON: (state) => state.finalJSON,
  getDevice: (state) => (id) => state.devicesList[id].device,
  getInterfaces: (state) => (id) => state.devicesList[id].interfacesList,
  getDevices: (state) => state.devicesList,
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
  setDisableUnused({ commit }, { id, disable }) {
    commit("SET_DISABLE_UNUSED", { id, disable });
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
    console.log(state.finalJSON);
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
      id: state.devicesList.length || 0,
      device: "",
      hostname: "",
      interfacesList: [],
      defaultGateway: "",
      banner: "",
      secret: "",
      passwordEncryption: false,
      disableUnused: false,
      ssh: [],
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
      name: "",
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
  SET_DISABLE_UNUSED(state, { id, disable }) {
    state.devicesList[id].disableUnused = disable;
  },
  SET_INTERFACE_NAME(state, { index, name, id }) {
    state.devicesList[id].interfacesList[index].name = name;
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
  REMOVE_DEVICE(state, id) {
    state.devicesList.splice(id, 1);
  },
};
