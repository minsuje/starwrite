package starwrite.server.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import starwrite.server.service.Neo4jService;

@Controller
@ResponseBody
public class Neo4jController {

private final Neo4jService neo4jService;

    public Neo4jController(Neo4jService neo4jService) {
        this.neo4jService = neo4jService;
    }

    @GetMapping("/create")
    public String createDocuments(@RequestParam("filePath") String filePath) {
        System.out.println("여기에요");
        this.neo4jService.createEmbeddings(filePath);
        return "done";
    }
}
