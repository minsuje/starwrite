package starwrite.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import starwrite.server.utils.WebClientServiceImpl;

@Service
public class BackgroundTaskService {
  @Autowired
  private WebClientServiceImpl webClientService;

  @Async
  public void parsePostBackground(Long postId, String content) {
    webClientService.post(postId, content);
  }
}
