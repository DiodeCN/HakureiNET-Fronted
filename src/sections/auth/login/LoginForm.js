import { useState } from 'react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
// @mui
import { Typography,Dialog, DialogTitle, DialogContent, DialogActions, Button,Link, Stack, IconButton, InputAdornment, TextField, Checkbox, textFieldClasses } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';



// components
import Iconify from '../../../components/iconify';
import { connect, sendMsg} from "./loginaction";

export default function LoginForm() {
  const navigate = useNavigate();
  const [type, setType] = React.useState('');
  const [customType, setCustomType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('请选择设备类型！');

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleCustomTypeChange = (event) => {
    setCustomType(event.target.value);
  };

  const handleClose = () => {
    setOpen(false); // 关闭弹窗
  };

  const handleClick = () => {
    const deviceType = type === 'custom' ? customType : type;
    if (deviceType !== ''){
      send();
    } else {
      setMessage('请选择设备类型！'); 
      setOpen(true); // 打开弹窗
    };
    console.log("设备类型：",deviceType);
    localStorage.setItem(`type.cache`, deviceType);

  };
  connect();
  const send = () => {
    const uid = document.getElementById("uid").value
    const password = document.getElementById("password").value
    const a =JSON.stringify(
     {
      uid:document.getElementById("uid").value,
      password:document.getElementById("password").value,
      thistype:type
     }
    )
    sendMsg(uid+password);


  }


  return (
    <>
      <Stack spacing={3}>
        <TextField name="UID" label="物联UID" id="uid" />
        <TextField
          name="password"
          id="password"
          label="验证码"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {type === 'custom' && (
          <TextField
            label="自定义设备类型"
            value={customType}
            onChange={handleCustomTypeChange}
          />
        )}
        {type !== 'custom' && (
          <FormControl fullWidth>
            <InputLabel id="select-label">设备类型</InputLabel>
            <Select
              name="form"
              id="form"
              labelId="select-label"
              value={type}
              onChange={handleTypeChange}
            >
              <MenuItem value="电灯">电灯</MenuItem>
              <MenuItem value="风扇">风扇</MenuItem>
              <MenuItem value="custom">自定义...</MenuItem>
            </Select>
          </FormControl>
        )}
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <FormControlLabel
          value="end"
          underline="hover"
          control={<Checkbox color="primary" />}
          label="保持绑定状态"
          labelPlacement="end"
          onChange={(e) => setKeepLoggedIn(e.target.checked)}
        />


      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        绑定并控制
      </LoadingButton>


      
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>提示</DialogTitle>
      <DialogContent sx={{ minWidth: '300px' }}>
      <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions sx={{ pr: 2, pb: 2 }}>
      <Button onClick={handleClose} variant="outlined">
      关闭
      </Button>
      </DialogActions>
      </Dialog>

    </>
  );
}
