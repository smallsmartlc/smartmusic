package smart.smartmusic.pojo;

public class Commentinfo {
    private Integer commentid;

    private Integer musicid;

    private Integer userid;

    private String username;

    private String comment_time;

    private String content;

    public Integer getCommentid() {
        return commentid;
    }

    public void setCommentid(Integer commentid) {
        this.commentid = commentid;
    }

    public Integer getMusicid() {
        return musicid;
    }

    public void setMusicid(Integer musicid) {
        this.musicid = musicid;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getComment_time() {
        return comment_time;
    }
    public String getCommentTime(){return comment_time;}
    public void setComment_time(String comment_time) {
        this.comment_time = comment_time == null ? null : comment_time.trim();
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }
}