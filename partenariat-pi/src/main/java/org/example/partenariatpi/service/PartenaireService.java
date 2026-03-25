package org.example.partenariatpi.service;

import lombok.RequiredArgsConstructor;
import org.example.partenariatpi.dto.PartenaireMapper;
import org.example.partenariatpi.dto.PartenaireRequest;
import org.example.partenariatpi.dto.PartenaireResponse;
import org.example.partenariatpi.feign.UserClient;
import org.example.partenariatpi.feign.UserDto;
import org.example.partenariatpi.model.Partenaire;
import org.example.partenariatpi.repository.PartenaireRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PartenaireService {

    private final PartenaireRepository partenaireRepository;
    private final UserClient userClient;
    private final PartenaireMapper mapper;

    public List<PartenaireResponse> getAll() {
        return partenaireRepository.findAll()
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    public PartenaireResponse getById(Integer id) {
        return mapper.toResponse(findById(id));
    }

    public PartenaireResponse create(PartenaireRequest request) {
        Partenaire p = mapper.toEntity(request);
        return mapper.toResponse(partenaireRepository.save(p));
    }

    public PartenaireResponse update(Integer id, PartenaireRequest request) {
        Partenaire existing = findById(id);
        existing.setNom(request.getNom());
        existing.setType(request.getType());
        existing.setContact(request.getContact());
        existing.setSiteWeb(request.getSiteWeb());
        return mapper.toResponse(partenaireRepository.save(existing));
    }

    public void delete(Integer id) {
        findById(id); // check exists first
        partenaireRepository.deleteById(id);
    }

    public PartenaireResponse addUser(Integer partenaireId, Integer userId) {
        userClient.getUserById(userId); // verify user exists
        Partenaire p = findById(partenaireId);
        p.getUserIds().add(userId);
        return mapper.toResponse(partenaireRepository.save(p));
    }

    public PartenaireResponse removeUser(Integer partenaireId, Integer userId,
                                         Integer requestingUserId, String role) {
        // admin can remove anyone
        // user can only remove themselves
        boolean isAdmin = "ROLE_ADMIN".equals(role);
        boolean isSelf = requestingUserId.equals(userId);

        if (!isAdmin && !isSelf) {
            throw new RuntimeException(
                    "Access denied: you can only remove yourself from a partenaire"
            );
        }

        Partenaire p = findById(partenaireId);
        p.getUserIds().remove(userId);
        return mapper.toResponse(partenaireRepository.save(p));
    }

    public List<PartenaireResponse> getByUserId(Integer userId) {
        return partenaireRepository.findByUserIdsContaining(userId)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    public List<UserDto> getUsersOfPartenaire(Integer partenaireId) {
        Partenaire p = findById(partenaireId);
        return p.getUserIds().stream()
                .map(userClient::getUserById)
                .toList();
    }

    // private helper — reused everywhere
    private Partenaire findById(Integer id) {
        return partenaireRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Partenaire not found with id: " + id));
    }
}