import { useState, useEffect } from "react";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import IconButton from "@mui/material/IconButton";
import ToysIcon from "@material-ui/icons/Toys";
import HelpIcon from "@material-ui/icons/Help";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { Helmet } from "react-helmet-async";
import { useTheme, makeStyles, styled } from "@mui/material/styles";
import {
  ListItemText,
  Divider,
  Grid,
  Container,
  Typography,
  Box,
  Switch,
  Slider,
  Menu,
  MenuItem,
  Button,
  Popover,
  Snackbar
} from "@mui/material";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Link, Redirect } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";

import { connect, sendMsg } from "../sections/auth/login/loginaction";

export default function DashboardAppPage() {
  const count = localStorage.getItem("count");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [onOff, setOnOff] = useState("开");

  // 写了半天废弃了，乐

  const [familyGroups, setFamilyGroups] = useState(() => {
    const storedGroups = localStorage.getItem("familyGroups");
    return storedGroups ? JSON.parse(storedGroups) : ["默认家庭组"];
  });
  const [selectedGroup, setSelectedGroup] = useState("默认家庭组");
  const [selectedGroup1, setSelectedGroup1] = useState("默认家庭组");

  const [isAddingGroup, setIsAddingGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [anchorElPopover, setAnchorElPopover] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const predefinedTimes = [0.5, 1, 2, 4, 8];
  const [customTime, setCustomTime] = useState(0);
  // const [selectedHours, setSelectedHours] = useState([]);
  // const [operationMode, setOperationMode] = useState("开");
  const [selectedHour, setSelectedHour] = useState(1);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedState, setSelectedState] = useState("开");
  const [selectedMinute, setSelectedMinute] = useState(14);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
    [theme.breakpoints.up("sm")]: {
      top: theme.spacing(1),
      right: theme.spacing(0),
    }
  }));

  const FamilyGroupSelector1 = ({ familyGroups, setSelectedGroup }) => {
    const [selectedGroup, setSelectedGroupLocal] = useState("");

    const handleChange = (event) => {
      const selectedGroup = event.target.value;
      setSelectedGroupLocal(selectedGroup);
      setSelectedGroup(selectedGroup);
    };

    return (
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select value={selectedGroup} onChange={handleChange}>
          <MenuItem value="">默认家庭组</MenuItem>
          {familyGroups.map((group, index) => (
            <MenuItem key={index} value={group}>
              {group}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  let id0 = null;

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const weekdays = [
    "周一",
    "周二",
    "周三",
    "周四",
    "周五",
    "周六",
    "周日",
  ];
  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleClear = () => {
    // 清除按钮的逻辑，例如重置选择器和复选框
    setSelectedHour(1);
    setSelectedDays([]);
    setSelectedState("开");
    setShowAutomationControls(false);
  };

  // 添加 useEffect，以便在 familyGroups 发生变化时触发更新
  useEffect(() => {
    if (isPopoverOpen) {
      setIsPopoverOpen(false);
      setIsPopoverOpen(true);
    }
  }, [familyGroups]);

  const renderPopoverContent = (groups, deviceId) => {
    const deviceFamilyGroup = localStorage.getItem(`${deviceId}.familygroup`);
    const countid = localStorage.getItem(`${deviceId}.countid`);

    if (deviceFamilyGroup === "") {
      setSelectedGroup1("默认家庭组"); // 这里有bug，只能开个默认家庭组乐
    }
    return (
      <Box sx={{ p: 2 }}>
        <FormControl fullWidth>
          <InputLabel htmlFor="family-group-selector1">家庭组</InputLabel>
          <Select
            label="家庭组"
            id="family-group-selector1"
            value={deviceFamilyGroup || ""} // 设置读取到的设备家庭组作为默认值，如果没有则为空字符串
            sx={{ bgcolor: "white", minWidth: "200px" }}
            onChange={(event) => {
              setSelectedGroup1(event.target.value);
              localStorage.setItem(
                `${deviceId}.familygroup`, // 问题出在这里，我存的是id不是countid
                event.target.value
              );
              localStorage.setItem(
                `${countid}.familygroup`, // 这样才对嘛
                event.target.value
              );
            }}
          >
            {groups.map((group, index) => (
              <MenuItem key={index} value={group}>
                {group}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  };

  const handlePopoverOpen = (event) => {
    setAnchorElPopover(event.currentTarget);
    setIsPopoverOpen(true);
  };

  // 在 handlePopoverClose 函数中添加对 setIsPopoverOpen 的调用
  const handlePopoverClose = () => {
    setAnchorElPopover(null);
    setIsPopoverOpen(false);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  connect();
  // sendMsg("OK");
  // console.log(count);

  let content = null;
  let controlcenter = null;
  let snackbar = null;

  const [showAutomationControls, setShowAutomationControls] = useState(false);
  const [showTimerControls, setShowTimerControls] = useState(false);
  const handleConfirm = () => {
    const selectedGroupName = selectedGroup;

    // 遍历所有设备 呜呜呜，为什么不能用++
    for (let i = 1; i <= count; i += 1) {
      const deviceFamilyGroup = localStorage.getItem(`${i}.familygroup`);
      const ids = localStorage.getItem(`${i}.id`);
      // 检查设备是否属于选定的家庭组
      if (deviceFamilyGroup === selectedGroupName) {
        // 调试用的  console.log(`设备 ${i} 属于选定的家庭组：${selectedGroupName}`);
        const action1 = selectedState;
        sendMsg(
          `${action1}|${selectedHour}|${selectedMinute}|${selectedDays}|${ids}`
        );
      }
    }

    setShowAutomationControls(false);
    setShowSnackbar(true);
  };

  const handleConfirm1 = () => {
    const selectedGroupName = selectedGroup;

    // console.log("选定的时间:", customTime);

    // 遍历所有设备 呜呜呜，为什么不能用++
    for (let i = 1; i <= count; i += 1) {
      const deviceFamilyGroup = localStorage.getItem(`${i}.familygroup`);
      const ids = localStorage.getItem(`${i}.id`);
      // 检查设备是否属于选定的家庭组
      if (deviceFamilyGroup === selectedGroupName) {
        // 调试用的   console.log(`设备 ${i} 属于选定的家庭组：${selectedGroupName}`);
        const action1 = selectedState;
        sendMsg(`${action1}|${customTime}|${ids}`);
      }
    }
    setShowTimerControls(false);
    setShowSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const handleCancel = () => {
    setShowTimerControls(false);
  };

  if (count === null) {
    content = (
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.72)",
          backdropFilter: "blur(10px)",
          p: 3,
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          mt: 2
        }}
      >
        <Typography variant="h2" sx={{ mb: 3, color: "#2E2E2E" }}>
          本地无设备
        </Typography>
        <Typography sx={{ color: ("#2E2E2E", 0.7) }} Typography variant="h3">
          请点击
          <Link to="/login" sx={{ color: "#007AFF", fontWeight: "bold" }}>
            绑定
          </Link>
          新掌控板
        </Typography>
      </Box>
    );
  } else if (count !== null) {
    const switches = Array.from({ length: count }, (_, index) => {
      const id = index + 1;
      const isLive = localStorage.getItem(`${id}.isLive`);
      if (isLive === "0") {
        return null;
      }
      const key = localStorage.getItem(`${id}.key`);
      id0 = localStorage.getItem(`${id}.id`);
      const ps = localStorage.getItem(`${id}.ps`);
      const type = localStorage.getItem(`${id}.type`);

      const shortKey = key.slice(0, 5);

      const DeviceIcon =
        type === "风扇"
          ? ToysIcon
          : type === "电灯"
          ? EmojiObjectsIcon
          : HelpIcon;
      const SwitchComponent =
        type === "风扇" ? (
          <Slider
            sx={{
              marginLeft: "auto",
              width: "100px" // 设置滑块宽度
            }}
            onChange={debounce((event, newValue) => {
              sendMsg(`&*${newValue}/${shortKey}`);
            }, 500)}
          />
        ) : (
          <Switch
            sx={{
              marginLeft: "auto"
            }}
            onChange={(event) => {
              const action = event.target.checked ? "&open;" : "&shut;";
              sendMsg(`${action}${shortKey}`);
            }}
          />
        );
      return (
        <Box className="switch">
          <Box
            key={id}
            id={id}
            sx={{
              alignItems: "center",
              display: "inline-flex",
              width: "calc(100% - 16px)",
              minWidth: "400px",
              maxWidth: "calc(100% - 16px)",
              height: "100px",
              padding: "16px",
              borderRadius: "16px",
              border: "1px solid #fff",
              marginBottom: "16px",
              marginTop: "16px",
              marginLeft: "8px",
              marginRight: "8px",
              background: "rgba(255, 255, 255, 0.7)", // 白色磨砂透明背景
              backdropFilter: "blur(10px)" // 模糊滤镜
            }}
          >
            {type === "风扇" ? (
              <ToysIcon className="icon" sx={{ fontSize: 60 }} />
            ) : type === "电灯" ? (
              <EmojiObjectsIcon className="icon" sx={{ fontSize: 60 }} />
            ) : (
              <HelpIcon className="icon" sx={{ fontSize: 60 }} />
            )}

            <Typography variant="subtitle1" color="textSecondary">
              &nbsp;设备号：{id0}
              <br />
              &nbsp;设备类型：{type}
            </Typography>

            {SwitchComponent}

            <IconButton
              sx={{
                marginLeft: "8px"
              }}
              onClick={() => {
                localStorage.setItem(`${id}.isLive`, 0);
                localStorage.setItem(`${id0}.aldregisteredcount`, "0");
                window.location.reload();
              }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton edge="end" color="inherit" onClick={handlePopoverOpen}>
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>
      );
    });

    const allSwitchesNull = switches.every((switchItem) => switchItem === null);

    if (allSwitchesNull) {
      content = (
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.72)",
            backdropFilter: "blur(10px)",
            p: 3,
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            mt: 2
          }}
        >
          <Typography variant="h2" sx={{ mb: 3, color: "#2E2E2E" }}>
            本地无设备
          </Typography>
          <Typography sx={{ color: ("#2E2E2E", 0.7) }} Typography variant="h3">
            请点击
            <Link to="/login" sx={{ color: "#007AFF", fontWeight: "bold" }}>
              绑定
            </Link>
            新掌控板
          </Typography>
        </Box>
      );
    } else {
      content = switches;
      controlcenter = (
        <>
          <Popover
            open={isPopoverOpen}
            anchorEl={anchorElPopover}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left"
            }}
          >
            {renderPopoverContent(familyGroups, id0)}
          </Popover>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Box
              id="contorlcenter"
              sx={{
                p: 5,
                borderRadius: 8,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                mt: 2,
                width: "calc(100% - 16px)",
                minWidth: "400px",
                maxWidth: "calc(100% - 16px)",
                background: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(10px)",
                alignItems: "center",
                align: "center"
              }}
            >
              <Typography variant="h3" sx={{ color: "#555555", mb: 2 }}>
                控制中心
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: "#555555",
                  mb: 2,
                  display: "flex",
                  alignItems: "center"
                }}
              >
                家庭组
              </Typography>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={12} sm={18}>
                  <Select
                    value={selectedGroup}
                    onChange={(event) => setSelectedGroup(event.target.value)}
                    fullWidth
                    id="homegroupselect"
                    sx={{ bgcolor: "white" }}
                  >
                    <MenuItem value={"新建家庭组"}>新建家庭组</MenuItem>

                    {familyGroups.map((group, index) => (
                      <MenuItem key={index} value={group}>
                        {group}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                {selectedGroup === "新建家庭组" && (
                  <Grid item xs={12} sm={18}>
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      sx={{ mb: 1 }}
                    >
                      填写新家庭组名称：
                    </Typography>
                    <TextField
                      label="新家庭组名称"
                      value={newGroupName}
                      onChange={(event) => setNewGroupName(event.target.value)}
                      fullWidth
                      sx={{ mb: 2 }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "left",
                        width: "100%",
                        marginTop: "0px"
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => {
                          if (newGroupName === "") {
                            setIsAddingGroup(false);
                          } else {
                            setIsAddingGroup(false);
                            setFamilyGroups((prevGroups) => [
                              ...prevGroups,
                              newGroupName
                            ]);
                            setSelectedGroup(newGroupName);
                            setNewGroupName("");
                            localStorage.setItem(
                              "familyGroups",
                              JSON.stringify([...familyGroups, newGroupName])
                            );
                          }
                        }}
                        sx={{ marginRight: "8px" }}
                      >
                        确定
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setIsAddingGroup(false);
                          setNewGroupName("");
                          setSelectedGroup("默认家庭组");
                        }}
                      >
                        取消
                      </Button>
                    </Box>
                  </Grid>
                )}
              </Grid>

              <Box
                sx={{
                  width: "100%",
                  borderTop: "1px solid black",
                  marginTop: 2
                }}
              >
                <Grid container spacing={2} sx={{ marginTop: 0 }}>
                  <Grid item xs={12} sm={0}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography
                          variant="h4"
                          sx={{
                            color: "#555555",
                            mb: 2,
                            display: "flex",
                            alignItems: "center"
                          }}
                        >
                          自动化|实验中...
                          <IconButton
                            edge="end"
                            color="inherit"
                            onClick={() =>
                              setShowAutomationControls(!showAutomationControls)
                            }
                            sx={{ marginLeft: 1 }}
                          >
                            {showAutomationControls ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </Typography>

                        {showAutomationControls && (
                          <>
                            <Typography
                              variant="subtitle1"
                              color="textSecondary"
                              sx={{ mb: 1 }}
                            >
                              选择时间：
                            </Typography>
                            <TextField
                              type="time"
                              value={`${selectedHour
                                .toString()
                                .padStart(2, "0")}:${selectedMinute
                                .toString()
                                .padStart(2, "0")}`}
                              onChange={(event) => {
                                const [hour, minute] =
                                  event.target.value.split(":");
                                setSelectedHour(parseInt(hour, 10));
                                setSelectedMinute(parseInt(minute, 10));
                              }}
                              sx={{ width: "100%" }}
                              inputProps={{
                                step: 60 // 每一分钟为一个步长
                              }}
                            />
                            <Grid item xs={12}>
                              <Typography
                                variant="subtitle1"
                                color="textSecondary"
                                sx={{ mb: 1, marginTop: "8px" }}
                              >
                                选择星期：
                              </Typography>
                              <FormGroup
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  m: 0
                                }}
                              >
                                {weekdays.map((day, index) => (
                                  <FormControlLabel
                                    key={index}
                                    control={
                                      <Checkbox
                                        checked={selectedDays.includes(day)}
                                        onChange={() => toggleDay(day)}
                                      />
                                    }
                                    label={day}
                                    sx={{ flexBasis: "8%", width: "80%" }}
                                  />
                                ))}
                              </FormGroup>
                            </Grid>
                            <Typography
                              variant="subtitle1"
                              color="textSecondary"
                              sx={{ mb: 1, marginTop: "8px" }}
                            >
                              执行命令：
                            </Typography>
                            <Select
                              value={selectedState}
                              onChange={(event) =>
                                setSelectedState(event.target.value)
                              }
                              sx={{ width: "100%" }}
                            >
                              <MenuItem value={"&open;"}>开</MenuItem>
                              <MenuItem value={"&shut;"}>关</MenuItem>
                              <MenuItem value={"&full;"}>满载！</MenuItem>
                              <MenuItem value={"&empty;"}>摆烂！</MenuItem>
                            </Select>
                            <Grid item xs={12}>
                              <Button
                                variant="contained"
                                onClick={handleConfirm}
                                sx={{ marginRight: "8px", marginTop: "16px" }}
                              >
                                确定
                              </Button>
                              <Button
                                variant="contained"
                                onClick={handleClear}
                                sx={{ marginTop: "16px" }}
                              >
                                清除
                              </Button>
                            </Grid>
                            <Box
                              sx={{
                                width: "100%",
                                borderTop: "1px solid black",
                                marginTop: 2
                              }}
                            />
                          </>
                        )}

                        <Grid container spacing={2} sx={{ marginTop: 0 }}>
                          <Grid item xs={12} sm={0}>
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <Typography
                                  variant="h4"
                                  sx={{
                                    color: "#555555",
                                    mb: 2,
                                    display: "flex",
                                    alignItems: "center"
                                  }}
                                >
                                  计时器
                                  <IconButton
                                    edge="end"
                                    color="inherit"
                                    onClick={() =>
                                      setShowTimerControls(!showTimerControls)
                                    }
                                    sx={{ marginLeft: 1 }}
                                  >
                                    {showTimerControls ? (
                                      <Visibility />
                                    ) : (
                                      <VisibilityOff />
                                    )}
                                  </IconButton>
                                </Typography>
                                {showTimerControls && (
                                  <>
                                    <Typography
                                      variant="subtitle1"
                                      color="textSecondary"
                                      sx={{ mb: 1 }}
                                    >
                                      预设时间：
                                    </Typography>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        flexWrap: "wrap"
                                      }}
                                    >
                                      {predefinedTimes.map((time, index) => (
                                        <Button
                                          key={index}
                                          variant="outlined"
                                          onClick={() =>
                                            setCustomTime(time * 60)
                                          }
                                          sx={{
                                            marginBottom: "8px",
                                            minWidth: "85px"
                                          }}
                                        >
                                          {time} 小时
                                        </Button>
                                      ))}
                                      <TextField
                                        label="自定义"
                                        type="number"
                                        value={customTime}
                                        onChange={(event) =>
                                          setCustomTime(
                                            parseInt(event.target.value, 10)
                                          )
                                        }
                                        InputProps={{
                                          endAdornment: (
                                            <InputAdornment
                                              position="end"
                                              sx={{
                                                display: "flex",
                                                alignItems: "center"
                                              }}
                                            >
                                              <span
                                                style={{ marginRight: "4px" }}
                                              >
                                                分
                                              </span>
                                              <span>钟</span>
                                            </InputAdornment>
                                          )
                                        }}
                                        sx={{
                                          width: "100%",
                                          marginBottom: "8px",
                                          marginTop: "8px"
                                        }}
                                      />
                                      <Typography
                                        variant="subtitle1"
                                        color="textSecondary"
                                        sx={{ mb: 1, marginTop: "8px" }}
                                      >
                                        执行命令：
                                      </Typography>
                                      <Select
                                        value={selectedState}
                                        onChange={(event) =>
                                          setSelectedState(event.target.value)
                                        }
                                        sx={{ width: "100%" }}
                                      >
                                        <MenuItem value={"&open;"}>开</MenuItem>
                                        <MenuItem value={"&shut;"}>关</MenuItem>
                                        <MenuItem value={"&full;"}>
                                          满载！
                                        </MenuItem>
                                        <MenuItem value={"&empty;"}>
                                          摆烂！
                                        </MenuItem>
                                      </Select>
                                    </Box>
                                    <Button
                                      variant="contained"
                                      onClick={handleConfirm1}
                                      sx={{
                                        marginRight: "8px",
                                        marginTop: "16px"
                                      }}
                                    >
                                      确定
                                    </Button>
                                    <Button
                                      variant="contained"
                                      onClick={handleCancel}
                                      sx={{ marginTop: "16px" }}
                                    >
                                      取消
                                    </Button>
                                  </>
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </div>
        </>
      );
      snackbar = (
        <>
          {" "}
          <StyledSnackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={showSnackbar}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            sx={{ maxWidth: 200,right: 50 ,marginTop:5,marginRight:2}}
            message={<Typography variant="h2">设置成功！</Typography>}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackbarClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          />{" "}
        </>
      );
    }
  }

  return (
    <>
      <Helmet>
        <title>次元连接|控制中心</title>
      </Helmet>

      <Container maxWidth="xl">
        {controlcenter}
        {content}
        {snackbar}
      </Container>
    </>
  );
}

// 很有意思的防抖函数
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
