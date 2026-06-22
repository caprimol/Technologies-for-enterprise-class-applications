package lab.app;

import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.client.Entity;
import jakarta.ws.rs.core.MediaType;

public class Main {
    public static void main(String[] args) {
        Client client = ClientBuilder.newClient();
        String baseUrl = "http://localhost:8080/Server-1.0-SNAPSHOT/api/complaints";

        System.out.println("--- ROZPOCZĘCIE TESTÓW KLIENTA ---");

        String allComplaints = client.target(baseUrl)
                .request(MediaType.APPLICATION_JSON)
                .get(String.class);
        System.out.println("\na. Wszystkie skargi:\n" + allComplaints);

        Long openComplaintId = 404L;
        String openComplaint = client.target(baseUrl + "/" + openComplaintId)
                .request(MediaType.APPLICATION_JSON)
                .get(String.class);
        System.out.println("\nb. Pobrana otwarta skarga (ID " + openComplaintId + "):\n" + openComplaint);

        String updatedComplaintJson = "{\n" +
                "  \"id\": " + openComplaintId + ",\n" +
                "  \"author\": \"Zaktualizowany Autor\",\n" +
                "  \"complaintDate\": \"2023-10-25\",\n" +
                "  \"complaintText\": \"Zaktualizowana treść skargi\",\n" +
                "  \"status\": \"closed\"\n" +
                "}";

        client.target(baseUrl + "/" + openComplaintId)
                .request(MediaType.APPLICATION_JSON)
                .put(Entity.json(updatedComplaintJson));
        System.out.println("\nc. Skarga " + openComplaintId + " została zaktualizowana (status -> closed).");

        String allOpenComplaints = client.target(baseUrl)
                .queryParam("status", "open")
                .request(MediaType.APPLICATION_JSON)
                .get(String.class);
        System.out.println("\nd. Wszystkie aktualnie otwarte skargi:\n" + allOpenComplaints);

        client.close();
        System.out.println("\n--- ZAKOŃCZENIE TESTÓW ---");
    }
}