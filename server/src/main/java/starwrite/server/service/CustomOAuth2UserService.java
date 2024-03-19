package starwrite.server.service;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import starwrite.server.auth.OAuth2Attribute;
import starwrite.server.entity.Users;
import starwrite.server.repository.UsersRepository;

@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UsersRepository usersRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // 기본 OAuth2UserService 객체 생성
        OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService = new DefaultOAuth2UserService();

        // OAuth2UserService 를 사용하여 OAuth2User 정보를 가져오기
        OAuth2User oAuth2User = oAuth2UserService.loadUser(userRequest);

        // 클라이언트 등록 ID(google)와 사용자 이름 속성 가져오기
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration()
            .getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        // OAuth2UserService 를 사용하여 가져온 OAuth2User 정보로 OAuth2Attribute 객체를 만들기
        OAuth2Attribute oAuth2Attribute = OAuth2Attribute.of(registrationId, userNameAttributeName,
            oAuth2User.getAttributes());

        // OAuth2Attribute 의 속성값들을 Map 으로 반환받음
        Map<String, Object> memberAttribute = oAuth2Attribute.convertToMap();

        // 사용자 email(또는 id) 정보를 가져오기
        String mail = (String) memberAttribute.get("mail");

        // 이메일로 가입된 회원인지 조회함
        Optional<Users> findUser = Optional.ofNullable(usersRepository.findUserByEmail(mail));

        if (findUser.isEmpty()) {
            // 회원이 존재하지 않을 경우, memberAttribute 의 exist 의 값을 false 로 넣어줌
            memberAttribute.put("exist", false);

            // 회원의 권한(회원이 존재하지 않으므로 기본권한인 ROLE_USER를 넣어준다), 회원속성, 속성이름을 이용해 DefaultOAuth2User 객체를 생성해 반환한다.
            return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")), memberAttribute,
                "mail");

        }

        // 회원이 존재할 경우, memberAttribute 의 exist 값을 true 로 넣어줌
        memberAttribute.put("exist", true);

        // 회원의 권한과, 회원속성, 속성이름을 이용해 DefaultOAuth2User 객체를 생성해 반환함.
        // securityConfig 에서 authority 로 체크하고 있기 떄문에 에러 발생할 경우 확인 필요!!!
        return new DefaultOAuth2User(
            Collections.singleton(new SimpleGrantedAuthority("ROLE_".concat(
                String.valueOf(findUser.get().getRole())))),
            memberAttribute, "mail");
    }
}
