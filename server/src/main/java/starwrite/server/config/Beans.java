package starwrite.server.config;

import org.neo4j.cypherdsl.core.renderer.Dialect;
import org.springframework.context.annotation.Bean;

public class Beans {

  @Bean
  org.neo4j.cypherdsl.core.renderer.Configuration cypherDslConfiguration() {
    return org.neo4j.cypherdsl.core.renderer.Configuration.newConfig()
        .withDialect(Dialect.NEO4J_5).build();
  }

}
