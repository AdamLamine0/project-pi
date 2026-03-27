package org.example.userpi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendResetPasswordEmail(String toEmail, String token){
        String resetLink ="http://localhost:8081/api/auth/reset-password?token="+ token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Reset your password");
        message.setText("Hello,\n\n" +
                "you requested to rest your password. \n\n"+
                "Click the link bellow to reset it \n\n"+
                resetLink +"\n\n"+
                "this link expires in 30 minutes. \n\n"+
                "If you did not request it please ignore this email."
                );

        mailSender.send(message);
    }
}
