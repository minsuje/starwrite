//package starwrite.server.config;
//
//import com.amazonaws.auth.AWSStaticCredentialsProvider;
//import com.amazonaws.auth.BasicAWSCredentials;
//import com.amazonaws.services.s3.AmazonS3Client;
//import com.amazonaws.services.s3.AmazonS3ClientBuilder;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class S3Config {
//
//  // S3 액세스 Key 값
//    @Value("${cloud.aws.credentials.access-key}")
//    private String accessKey;
//
//    // S3 비밀 Key 값
//    @Value("${cloud.aws.credentials.secret-key}")
//    private String secretKey;
//
//    // S3 지역
//    @Value("${cloud.aws.region.static}")
//    private String region;
//
//    // 등록 한 AccessKey 와 SecretKey 로 아마존 서비스 실행 준비
//    @Bean
//    public AmazonS3Client amazonS3Client() {
//      BasicAWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
//
//      return (AmazonS3Client) AmazonS3ClientBuilder
//          .standard()
//          .withRegion(region)
//          .withCredentials(new AWSStaticCredentialsProvider(credentials))
//          .build();
//    }
//}
