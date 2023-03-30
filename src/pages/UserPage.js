import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import WbIncandescentIcon from "@material-ui/icons/WbIncandescent";
import HearingIcon from "@material-ui/icons/Hearing";
import VibrationIcon from "@material-ui/icons/Vibration";


import {
  Card,
  Stack,
  Container,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Box,
  Snackbar,
} from "@mui/material";

import { connect, sendMsg } from "../sections/auth/login/loginaction";

export default function EnvironmentPage() {
  const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
  connect();
  const [isLoading, setIsLoading] = useState(false);
  const [wendu, setWendu] = useState(localStorage.getItem("wendu") || "");
  const [shidu, setShidu] = useState(localStorage.getItem("shidu") || "");
  const [guanggan, setGuanggan] = useState(
    localStorage.getItem("guanggan") || ""
  );
  const [zaoyin, setZaoyin] = useState(localStorage.getItem("zaoyin") || "");


  
  const [environmentData, setEnvironmentData] = useState(() => [
    {
      id: 1,
      title: "温度",
      value:  "Blank",
      icon: <WhatshotIcon style={{ fontSize: 40 }} />,
    },
    {
      id: 2,
      title: "湿度",
      value: "Blank",
      icon: <InvertColorsIcon style={{ fontSize: 40 }} />,
    },
    {
      id: 3,
      title: "光感",
      value:  "Blank",
      icon: <WbIncandescentIcon style={{ fontSize: 40 }} />,
    },
    {
      id: 4,
      title: "噪音",
      value: "Blank",
      icon: <HearingIcon style={{ fontSize: 40 }} />,
    },
    {
      id: 5,
      title: "震动",
      value: "0",
      icon: <VibrationIcon style={{ fontSize: 40 }} />,
    },
  ]);


  

  useEffect( () => {
    const fetchData = async () => {
      if (!wendu || !shidu || !guanggan || !zaoyin) {
        setIsLoading(true);
        sendMsg("&askforstate;");
        await sleep(5000);
        window.location.reload();
      } else {
        setIsLoading(false);
      }
    };

    fetchData();

    const intervalId = setInterval(async () => {
      sendMsg("&askforstate;");
      await sleep(1000)



      const updatedEnvironmentData = [...environmentData];
      updatedEnvironmentData[0].value = localStorage.getItem("wendu");
      updatedEnvironmentData[1].value = localStorage.getItem("shidu");
      updatedEnvironmentData[2].value = localStorage.getItem("guanggan");
      updatedEnvironmentData[3].value = localStorage.getItem("zaoyin");
      setEnvironmentData(updatedEnvironmentData);
      sendMsg("&askforstate;");
      setTimeout(() => {
        // 在这里添加刷新页面的代码
        const updatedEnvironmentData = [...environmentData];
        updatedEnvironmentData[0].value = localStorage.getItem("wendu");
        updatedEnvironmentData[1].value = localStorage.getItem("shidu");
        updatedEnvironmentData[2].value = localStorage.getItem("guanggan");
        updatedEnvironmentData[3].value = localStorage.getItem("zaoyin");
        setEnvironmentData(updatedEnvironmentData);
      }, 1000);
    }, 5000);
    // 哈哈，根本用不上useState，甚至不用刷新整个页面，性能好得多了

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const updatedEnvironmentData = [...environmentData];
    updatedEnvironmentData[0].value = wendu;
    updatedEnvironmentData[1].value = shidu;
    updatedEnvironmentData[2].value = guanggan;
    updatedEnvironmentData[3].value = zaoyin;
    setEnvironmentData(updatedEnvironmentData);
  }, [wendu, shidu, guanggan, zaoyin]);

  return (
    <>
      <Helmet>
        <title>次元连接|家庭环境</title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h2" gutterBottom>
            家庭环境
          </Typography>
        </Stack>

        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.72)",
            backdropFilter: "blur(10px)",
            p: 3,
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >

          <TableContainer
            sx={{
              minWidth: 250,
              overflowX: "auto",
              display: isLoading ? "none" : "block",
            }}
          >
            <Table>
              <TableBody>
                {environmentData.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        {data.icon}
                        <Typography variant="h4" sx={{ fontSize: "2.4rem" }}>
                          {data.title}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h5" sx={{ fontSize: "2.4rem" }}>
                        {data.value}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
}
