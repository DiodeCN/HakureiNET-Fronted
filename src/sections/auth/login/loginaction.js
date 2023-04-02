const socket = new WebSocket("ws://129.211.217.230:6280/ws");

const connect = () => {
  console.log("连接中");
  socket.onopen = () => {
    console.log("连接成功！");
  };

  socket.onmessage = (event) => {
    const msg = event.data;
    console.log("Received message: ", msg);

    // 确保消息格式正确并执行绑定设备操作
    if (ensure(msg)) {
      console.log("验证成功");

      // 从消息中提取id和ps
      const match = msg.match(/\d+/g);
      const key = match.join("");
      const id = key.slice(0, 5);
      const ps = key.slice(5);

      // 读取本地存储中的计数器和设备类型
      const count = Number(localStorage.getItem("count") || 0);
      const type = localStorage.getItem("type.cache");

      // 判断设备是否已经被注册
      const isRegistered =
        localStorage.getItem(`${id}.aldregisteredcount`) === "1";

      if (isRegistered) {
        alert(`设备已被绑定`);
        return;
      }

      // 更新本地存储
      const counts = count + 1;
      localStorage.setItem(`${counts}.key`, key);
      localStorage.setItem(`${counts}.id`, id);
      localStorage.setItem(`${counts}.ps`, ps);
      localStorage.setItem(`${counts}.isLive`, "1");
      localStorage.setItem(`${counts}.type`, type);
      localStorage.setItem(`${id}.aldregisteredcount`, "1");
      localStorage.setItem(`${id}.countid`, counts);

      // localStorage.setItem(`${counts}.familygroup`,"默认家庭组");
      localStorage.setItem(`${id}.familygroup`, "默认家庭组");
      localStorage.setItem(`${counts}.familygroup`, "默认家庭组");

      console.log(`${counts}台设备已绑定`);

      localStorage.setItem("id", counts);
      localStorage.setItem("key", key);
      localStorage.setItem("count", counts);

      // 跳转到dashboard页面
      window.location.href = "/dashboard";

      // 确保消息格式正确并执行新状态上传操作
    } else if (ensure1(msg)) {
      console.log("新状态上传");

      const [shidu, wendu, guanggan, zaoyin] = msg.split("/");

      // 将每个数字存储到localStorage中
      localStorage.setItem("shidu", shidu);
      localStorage.setItem("wendu", wendu);
      localStorage.setItem("guanggan", guanggan);
      localStorage.setItem("zaoyin", zaoyin);

      // 消息格式不正确
    } else {
      console.log("消息格式不正确");
    }
  };

  socket.onclose = (event) => {
    console.log("Socket Closed Connection: ", event);
  };

  socket.onerror = (error) => {
    console.log("Socket Error: ", error);
  };
};

const sendMsg = (msg) => {
  console.log("sending msg: ", msg);
  socket.send(msg);
};

const ensure = (msg) => {
  if (msg.includes("验证成功")) {
    return true;
  }
  return false;
};

const ensure1 = (msg) => {
  if (msg.includes("/") && msg.split("/").length === 4) {
    return true;
  }
  return false;
};

export { connect, sendMsg };
