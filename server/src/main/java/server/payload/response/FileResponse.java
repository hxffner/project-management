package server.payload.response;

import java.io.File;
import java.util.Arrays;

public class FileResponse {
    private String name;

    private byte[] data;

    public FileResponse(String name, byte[] data) {
        this.name = name;
        this.data = data;
    }

    @Override
    public String toString() {
        return "FileResponse{" +
                "name='" + name + '\'' +
                ", data=" + Arrays.toString(data) +
                '}';
    }
}