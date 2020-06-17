package smart.smartmusic.service;

import smart.smartmusic.pojo.Commentinfo;

import java.util.List;

public interface CommentinfoService {
    List<Commentinfo> selectCommentByMusicID(Integer musicid);
    void addComment(Commentinfo commentinfo);
}
