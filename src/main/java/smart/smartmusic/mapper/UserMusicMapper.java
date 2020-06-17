package smart.smartmusic.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import smart.smartmusic.pojo.UserMusicExample;
import smart.smartmusic.pojo.UserMusicKey;

@Mapper
public interface UserMusicMapper {
    long countByExample(UserMusicExample example);

    int deleteByExample(UserMusicExample example);

    int deleteByPrimaryKey(UserMusicKey key);

    int insert(UserMusicKey record);

    int insertSelective(UserMusicKey record);

    List<UserMusicKey> selectByExample(UserMusicExample example);

    List<UserMusicKey> selectByPrimaryKey(Integer userid);

    int updateByExampleSelective(@Param("record") UserMusicKey record, @Param("example") UserMusicExample example);

    int updateByExample(@Param("record") UserMusicKey record, @Param("example") UserMusicExample example);

    void deleteByUserID(Integer userid);
}