//package starwrite.server.auth;
//
//import java.util.Map;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.ToString;
//
//@ToString
//@Builder
//@Getter
//public class OAuth2Attribute {
//    private Map<String, Object> attributes; // 사용자 속성 정보를 담는 Map
//    private String attributeKey; // 사용자 속성의 키 값
//    private String mail; // 이메일 정보
//    private String name; // 이름 정보
//    private String profile_img; // 프로필 사진 정보
//    private String provider; // 제공자 정보
//
//    // 서비스에 따라 OAuth2Attribute 객체를 생성하는 메서드
//    static OAuth2Attribute of(String provider, String attributeKey, Map<String, Object> attributes) {
//        if (provider != null) {
//            switch (provider) {
//                case "google" :
//                    return ofGoogle(provider, attributeKey, attributes);
//                default :
//                    throw new RuntimeException();
//            }
//        }
//        return null;
//    }
//
//    //  Google 로그인일 경우 사용하는 메서드, 사용자 정보가 따로 Wrapping 되지 않고 제공되어, 바로 get() 메서드로 접근 가능함
//    private static OAuth2Attribute ofGoogle(String provider, String attributeKey, Map<String, Object> attributes) {
//
//    }
//
//
//}
