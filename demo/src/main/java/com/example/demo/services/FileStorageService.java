package com.example.demo.services;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    String store(MultipartFile file);
    String storeGenerated(String filenamePrefix, String extension, byte[] content);
}
