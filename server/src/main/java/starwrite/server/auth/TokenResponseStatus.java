package starwrite.server.auth;


public class TokenResponseStatus {
    private int status;
    private String accessToken;

    public TokenResponseStatus(int status, String accessToken) {
        this.status = status;
        this.accessToken = accessToken;
    }

    public static TokenResponseStatus addStatus(int status, String accessToken) {
        return new TokenResponseStatus(status, accessToken);
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}