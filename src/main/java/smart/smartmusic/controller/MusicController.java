package smart.smartmusic.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import smart.smartmusic.pojo.Musicinfo;
import smart.smartmusic.pojo.UserMusicKey;
import smart.smartmusic.service.MusicService;
import smart.smartmusic.service.UserMusicService;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@RestController
public class MusicController {

    @Autowired
    private MusicService musicService;
    @Autowired
    private UserMusicService userMusicService;

    @RequestMapping("/getAllMusic")
    public List<Musicinfo> getAllMusic(){
        return this.musicService.findAll();
    }
    @RequestMapping("/getMusicByid")
    public List<Musicinfo> getMusicByid(HttpSession session){
        if(session.getValue("smartmusicuseid")==null){
            return null;
        }
        List<Musicinfo> list = new ArrayList<>();
        Integer id = (Integer)session.getValue("smartmusicuseid");
        List<UserMusicKey> userMusicKeys = this.userMusicService.findKeysById(id);
        for (UserMusicKey usermusic:userMusicKeys){
            list.add(this.musicService.findMusicByid(usermusic.getMusicid()));
        }
        return list;
    }
}
