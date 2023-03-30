import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography,Box } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title>次元连接|关于网站</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h2" gutterBottom>
            关于网站
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
<Typography variant="h4" gutterBottom align="left">
            用了两三年的阿里云香港服务器放的博客，那东西确实能全方面的介绍我这个作者。但是我这个月月初爱国心一阵荡漾，头脑一热换域名+国内服务器了，然后就要备案，但是令人担忧的是江西省通信管理局迟迟未发放license...（尽管我的工作证明确实是合法的，但是又真的有多少人相信十六岁的小朋友有半年的工作经验呢，所以这件事也真的挺悬（）<br/>
            哎哟，也不扯远了，既然这里是前端，我就说前端的事儿。网站这个样子，至少不是那么丑，还是挺简单的，就要时间和技术，时间好说，放完晚自习每天捣鼓一个小时，慢慢进行嘛，挺不错的。这个技术嘛，说的好听点叫“学习再生产”，直截了当的呢，就是“缝！”，扒开我的路由器，可以发现十个网页里面六个是“https://v4.mui.com/*”的官方文档。<br/>
            你要说我学了些什么吧，我又学了些东西，比如函数方面的usestate页面样式的sx这些有点类似于自成一派的掌控。你要说没学吧，我还真没学，所有的东西我都都直接用表达式凑成一个类似于表结构的数据库（正常人都会用json或者litesql这种对吧），不，我不，因为我在几天的折磨下发现“这个好难喔”，然后，就成就了我这“高精尖”前端<br/>
            其实这个前端我是不打算提交的，因为框架是我在Creative-Tim随意挑的一个，虽然在我改写大约1600行代码后，距离原有的状况已经有了完全的天翻地覆的变化，但是我还是没有什么底。转头一问我的指导老师，他说有原创部分就可以交，那我就献丑了（）<br/>
            我的修改呢，主要在Dashboard首页，这600+行代码有八成是我写的，但是也比较水，为什么呢？因为我反复试验然后增减代码，难免剩了些“残留物”，比如说有些状态的简单定义我就没有删除、甚至还有拼搏一个周末发现“哦，页面好难看”的惨事，当然，有些我实在不舍得，我甚至就直接注释化了！<br/>
            然后呢，我写了个登录页，还给登录页弄了个原生js的“loginaction”，再就是本页面和“家庭环境”。然后呢，我就跟着自己的艺术感把navbar和tittle搓了出来，其余的css、palette、route、404面得益于框架，很轻松就用的挺好。<br/>
            当然，前端的完善度是相对后端而言更高的，因为前端确实比后端简单一点，但是还有一些没有做到的，我打算提交项目再继续打磨并且提交到GitHub代码仓库的：1.不好看。网站目前还处于比较臃肿的状态，主要是为了适配手机端，做app？所以我打算后面搞个独立的mobile版2.前面提到的，存储缓存的方式不够成熟3.功能比较简单，这个也是很重要的，需要时间打磨。<br/>
            聊完缺点咱毕竟还得自夸一下这个优点，第一呢就是网站确实挺好看，在手机上赏心悦目的（怎么感觉自相矛盾了），第二就是写得比较成熟，没有语文的那种一唱三叹，我举个例，一开始的“家庭环境”这个网页，工作逻辑是：先找后端，听到消息再写缓存，写完缓存再延迟一秒就刷新页面。拜托，这太浪费了！然后我转念一想我是reactjs啊，又不是php或者html！
            于是我不费吹灰之力改了个直接写value的方案，没了没过几秒就要刷新整个页面的烦恼。第三呢就是功能也不简单了，我也仔细研究了“同行”小米的智能插座，对面现阶段也就比我多一个接入了小爱语音助手嘛，这个好说，一切尽在掌控板中,语音模块的事儿嘛。所以，优势在我！
          </Typography>
          </Box>
      </Container>
    </>
  );
}
