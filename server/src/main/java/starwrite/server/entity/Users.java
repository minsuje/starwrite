package starwrite.server.entity;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
import org.springframework.data.neo4j.core.support.UUIDStringGenerator;
import starwrite.server.enums.Role;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Node("Users")
public class Users {

    @Id
    @GeneratedValue(generatorClass = UUIDStringGenerator.class)
    private String userId;

    private String login_type;

    private String mail;

    private String socialId;

    private String password;

    private String profile_img;

    private String nickname;

    private Role role;

    private String access_token;

    private String refresh_token;

    @Relationship(type = "OWNS")
    private List<Category> category;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
