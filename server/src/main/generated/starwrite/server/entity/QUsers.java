package starwrite.server.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QUsers is a Querydsl query type for Users
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUsers extends EntityPathBase<Users> {

    private static final long serialVersionUID = -2107217337L;

    public static final QUsers users = new QUsers("users");

    public final StringPath access_token = createString("access_token");

    public final DateTimePath<java.time.LocalDateTime> created_at = createDateTime("created_at", java.time.LocalDateTime.class);

    public final StringPath email = createString("email");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath login_type = createString("login_type");

    public final StringPath nickname = createString("nickname");

    public final StringPath password = createString("password");

    public final StringPath profile_img = createString("profile_img");

    public final StringPath refresh_token = createString("refresh_token");

    public final EnumPath<starwrite.server.enums.Role> role = createEnum("role", starwrite.server.enums.Role.class);

    public final StringPath socialId = createString("socialId");

    public final DateTimePath<java.time.LocalDateTime> updated_at = createDateTime("updated_at", java.time.LocalDateTime.class);

    public QUsers(String variable) {
        super(Users.class, forVariable(variable));
    }

    public QUsers(Path<? extends Users> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUsers(PathMetadata metadata) {
        super(Users.class, metadata);
    }

}

