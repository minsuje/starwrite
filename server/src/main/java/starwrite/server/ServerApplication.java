package starwrite.server;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.neo4j.repository.config.EnableNeo4jRepositories;
import org.springframework.scheduling.annotation.EnableAsync;
import starwrite.server.repository.UsersRepository;

@SpringBootApplication
@EnableNeo4jRepositories
@EnableAsync
public class ServerApplication {


	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

  @Bean
  CommandLineRunner initial(UsersRepository usersRepository) {
    return args -> {
      // Neo4j Constraints
      usersRepository.createUserNicknameConstraint();
      usersRepository.createUserMailConstraint();
      usersRepository.createVectorConstraint();
//      usersRepository.createPostTitleConstraint();
    };
  }

}


