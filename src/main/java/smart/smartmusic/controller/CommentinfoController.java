package smart.smartmusic.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import smart.smartmusic.pojo.Commentinfo;
import smart.smartmusic.service.CommentinfoService;
import smart.smartmusic.service.UserServiceImpl;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
public class CommentinfoController {

    @Autowired
    private CommentinfoService commentinfoService;
    @Autowired
    private UserServiceImpl usersService;

    @RequestMapping("/selectCommentByMusicID")
    public List<Commentinfo> selectCommentByMusicID(Commentinfo commentinfo){
        Integer musicid = commentinfo.getMusicid();
        return this.commentinfoService.selectCommentByMusicID(musicid);
    }
    @RequestMapping("/getCommentNumsByMusicID")
    public int getCommentNumsByMusicID(Commentinfo commentinfo){
        Integer musicid = commentinfo.getMusicid();
        return this.commentinfoService.selectCommentByMusicID(musicid).size();
    }
    @RequestMapping("/addCommentByid")
    public String addCommentByid(Commentinfo commentinfo, HttpSession session){
        Integer userid = (Integer)session.getValue("smartmusicuseid");
        commentinfo.setUserid(userid);
        try {
            String username = this.usersService.getUserName(userid);
            commentinfo.setUsername(username);
            String date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
            commentinfo.setComment_time(date);
            this.commentinfoService.addComment(commentinfo);
            return "0915";
        }catch (Exception e){
            System.out.println(e.getMessage());
            return  "hhh";
        }
    }
}
