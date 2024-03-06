package starwrite.server.service;

import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@Component
public class Neo4jService {
    private final VectorStore vectorStore;

    public Neo4jService(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }




    public void createEmbeddings(String filePath) {
        // Example of creating 10 random documents
        List<Document> documents = new ArrayList<>();
        Random random = new Random();

        for (int i = 0; i < 10; i++) {
            // Assuming Document has a constructor that takes an ID and some content
            String documentId = "doc" + i;
            String documentContent = "Random content " + random.nextInt(1000); // Replace with actual document content
            Document document = new Document(documentContent);

            documents.add(document);
        }

        // Example of using the documents list
        vectorStore.add(documents);

        // Just for debugging
        System.out.println("Documents: " + documents);
    }
}
