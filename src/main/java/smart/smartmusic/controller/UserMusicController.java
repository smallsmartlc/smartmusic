package smart.smartmusic.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import smart.smartmusic.pojo.Musicinfo;
import smart.smartmusic.pojo.UserMusicKey;
import smart.smartmusic.service.UserMusicService;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
public class UserMusicController {

    @Autowired
    private UserMusicService userMusicService;

    @RequestMapping("/addMusicById")
    public String addMusicById(UserMusicKey userMusic,HttpSession session){
        if(session.getValue("smartmusicuseid")==null){
            return "请登陆后再添加";
        }
        Integer id = (Integer)session.getValue("smartmusicuseid");
        userMusic.setUserid(id);
        Boolean flag = this.userMusicService.addMusicByUserMusicKey(userMusic);
        if (flag){
            return "0915";
        }else{
            return "该歌曲已添加";
        }
    }
    @RequestMapping("/removeMusicById")
    public String removeMusicById(UserMusicKey userMusic,HttpSession session){
        if(session.getValue("smartmusicuseid")==null){
            return "请登陆后再删除";
        }
        Integer id = (Integer)session.getValue("smartmusicuseid");
        userMusic.setUserid(id);
        Boolean flag = this.userMusicService.removeMusicByUserMusicKey(userMusic);
        if (flag){
            return "0915";
        }else{
            return "fail";
        }
    }
    @RequestMapping("/removeMusicByUserID")
    public String removeMusicByUserID(HttpSession session){
        if(session.getValue("smartmusicuseid")==null){
            return "请登陆后再删除";
        }
        Integer id = (Integer)session.getValue("smartmusicuseid");
        Boolean flag = this.userMusicService.removeMusicByUserID(id);
        if (flag){
            return "0915";
        }else{
            return "fail";
        }
    }
}
