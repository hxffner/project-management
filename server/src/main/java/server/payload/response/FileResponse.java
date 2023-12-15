package server.payload.response;

import java.io.File;

public class FileResponse {
    private String name;

    private File file;

    public FileResponse(String name, File file) {
        this.name = name;
        this.file = file;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }
}