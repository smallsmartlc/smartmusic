package smart.smartmusic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import smart.smartmusic.mapper.UserMapper;
import smart.smartmusic.pojo.User;
import smart.smartmusic.pojo.UserExample;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public List<User> findAll(){
        UserExample userExample = new UserExample();
        return this.userMapper.selectByExample(userExample);
    }

    @Override
    public Boolean checkLogin(User user) {
//        System.out.println(user);
//        User user1 = this.userMapper.selectByPrimaryKey(user.getUserid());
//        System.out.println(user1);
        String password = this.userMapper.selectPasswordByKey(user.getUserid());
//        System.out.println(password);
        if(!user.getPassword().equals(password)){
            return false;
        }
        return true;
    }

    @Override
    public Boolean checkReg(User user) {
        System.out.println(user);
        try {
            this.userMapper.insert(user);
            return true;
        }catch (Exception e){
            System.err.println(e.getMessage());
            return false;
        }
    }

    @Override
    public String getUserName(Integer id) {
        User user = this.userMapper.selectByPrimaryKey(id);
        return user.getUsername();
    }
}
