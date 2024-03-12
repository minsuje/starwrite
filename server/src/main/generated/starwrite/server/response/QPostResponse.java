package starwrite.server.response;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QPostResponse is a Querydsl query type for PostResponse
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPostResponse extends EntityPathBase<PostResponse> {

    private static final long serialVersionUID = -1855804732L;

    public static final QPostResponse postResponse = new QPostResponse("postResponse");

    public final SimplePath<starwrite.server.entity.Post> post = createSimple("post", starwrite.server.entity.Post.class);

    public final SimplePath<Object> relationship = createSimple("relationship", Object.class);

    public final SimplePath<starwrite.server.entity.GraphUser> user = createSimple("user", starwrite.server.entity.GraphUser.class);

    public QPostResponse(String variable) {
        super(PostResponse.class, forVariable(variable));
    }

    public QPostResponse(Path<? extends PostResponse> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPostResponse(PathMetadata metadata) {
        super(PostResponse.class, metadata);
    }

}

