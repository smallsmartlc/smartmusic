package smart.smartmusic.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import smart.smartmusic.pojo.User;
import smart.smartmusic.service.UserServiceImpl;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserServiceImpl usersService;
    @RequestMapping("/getAllUsers")
    public List<User> getAllUsers(){
        return usersService.findAll();
    }
    @GetMapping("/getsession")
    public String getSession(HttpSession session){
        String res = session.getValue("smartmusicuseid")==null?"hhh":"0915";
        System.out.println(res);
        return res;
    }
    @GetMapping("/logoff")
    public ModelAndView logOff(HttpSession session){
        session.putValue("smartmusicuseid",null);
        return new ModelAndView("redirect:/index.html");
    }
    @GetMapping("/getusername")
    public String getUserName(HttpSession session){
        Integer id =(Integer)session.getValue("smartmusicuseid") ;
        try {
            return this.usersService.getUserName(id);
        }catch (Exception e){
            return "";
        }
    }
    @PostMapping("/checkLogin")
    public String checkLogin(User user, HttpSession session){
        try {
            if(this.usersService.checkLogin(user)){
                session.putValue("smartmusicuseid",user.getUserid());
                return "0915";
            }else{
                return "用户名或密码错误";
            }
        }catch (Exception e){
            return "服务器异常,联系管理员";
        }
    }
    @PostMapping("/checkReg")
    public String checkReg(User user){
        try {
            if(this.usersService.checkReg(user)){
                return "0915";
            }else{
                return "该用户已被注册";
            }
        }catch (Exception e){
            return "注册失败,服务器异常";
        }
    }
}
