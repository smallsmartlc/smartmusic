package smart.smartmusic.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import smart.smartmusic.pojo.Commentinfo;
import smart.smartmusic.pojo.CommentinfoExample;

@Mapper
public interface CommentinfoMapper {
    long countByExample(CommentinfoExample example);

    int deleteByExample(CommentinfoExample example);

    int deleteByPrimaryKey(Integer commentid);

    int insert(Commentinfo record);

    int insertSelective(Commentinfo record);

    List<Commentinfo> selectByExample(CommentinfoExample example);

    Commentinfo selectByPrimaryKey(Integer commentid);

    int updateByExampleSelective(@Param("record") Commentinfo record, @Param("example") CommentinfoExample example);

    int updateByExample(@Param("record") Commentinfo record, @Param("example") CommentinfoExample example);

    int updateByPrimaryKeySelective(Commentinfo record);

    int updateByPrimaryKey(Commentinfo record);

    List<Commentinfo> selectById(Integer musicid);
}