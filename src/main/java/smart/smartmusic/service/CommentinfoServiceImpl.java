package smart.smartmusic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import smart.smartmusic.mapper.CommentinfoMapper;
import smart.smartmusic.pojo.Commentinfo;

import java.util.List;

@Service
public class CommentinfoServiceImpl implements CommentinfoService{

    @Autowired
    private CommentinfoMapper commentinfoMapper;

    @Override
    public List<Commentinfo> selectCommentByMusicID(Integer musicid) {
        return this.commentinfoMapper.selectById(musicid);
    }

    @Override
    public void addComment(Commentinfo commentinfo) {
        this.commentinfoMapper.insert(commentinfo);
    }
}
