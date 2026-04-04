# 🏗️ Partenariat-PI Architecture Guide

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture Layers](#architecture-layers)
3. [Core Components Explained](#core-components-explained)
4. [Spring Boot Annotations](#spring-boot-annotations)
5. [Request Flow Example](#request-flow-example)
6. [Security & Authorization](#security--authorization)

---

## Project Overview

**What is this project?**
This is a **Spring Boot microservice** that manages partnerships between entrepreneurs and organizations. It handles:
- Creating and managing **Conventions** (partnership agreements)
- Managing **Objectifs** (goals/commitments within conventions)
- Managing **Organisations Partenaires** (partner organizations)
- Multi-step signing workflows
- Renewal processes

**Tech Stack:**
- **Framework:** Spring Boot 4.0.4
- **Language:** Java 17
- **Database:** MySQL (JPA/Hibernate)
- **Architecture:** Microservices with Spring Cloud
- **Security:** Spring Security + JWT tokens (via API Gateway)
- **Communication:** OpenFeign (for inter-service calls)

---

## Architecture Layers

Your project follows the **Layered Architecture** pattern:

```
┌─────────────────────────────────────────────────┐
│         CONTROLLER LAYER (Entry Point)          │
│    ConventionController, ObjectifController    │
│         └→ Receives HTTP requests              │
│         └→ Validates @RequestHeader/@RequestBody
└─────────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────┐
│            SERVICE LAYER (Business Logic)        │
│    ConventionService, ObjectifService          │
│         └→ Processes business rules            │
│         └→ Calls Repository layer              │
└─────────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────┐
│          REPOSITORY LAYER (Data Access)         │
│    ConventionRepository, ObjectifRepository    │
│         └→ Talks to the Database               │
│         └→ Returns Entity objects              │
└─────────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────┐
│             DATABASE (MySQL)                    │
│         └→ Stores actual data                  │
└─────────────────────────────────────────────────┘
```

---

## Core Components Explained

### 1️⃣ **CONTROLLER LAYER** (`controller/ConventionController.java`)

**What it does:**
- Acts as the **HTTP endpoint handler** (entry point for API requests)
- Receives requests from the client/frontend
- Validates user permissions (role checks)
- Passes data to the Service layer
- Returns HTTP responses

**How to recognize it:**
- Decorated with `@RestController`
- Methods decorated with `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`
- Takes `@RequestHeader`, `@PathVariable`, `@RequestBody` parameters

**Example:**
```java
@RestController
@RequestMapping("/api/conventions")
public class ConventionController {
    
    @GetMapping("/{id}")
    public ResponseEntity<ConventionResponse> getById(@PathVariable Integer id) {
        // 1. Controller receives the request with id=5
        // 2. Calls service.getById(5)
        // 3. Service returns the data
        // 4. Controller wraps it in ResponseEntity.ok() and sends to client
        return ResponseEntity.ok(conventionService.getById(id));
    }
}
```

**Key Methods:**
- `getAll()` - Fetch all conventions
- `getById()` - Fetch a specific convention
- `create()` - Create a new convention
- `update()` - Update existing convention
- `delete()` - Delete a convention
- `confirmer()` - Confirm/sign the convention

---

### 2️⃣ **DTO LAYER** (`dto/`)

**What is DTO?**
**DTO = Data Transfer Object**

DTOs are like "custom wrappers" for sending and receiving data. They control:
- What data is exposed to the client
- What data the client sends to the server
- Data validation

**Three main DTOs in your project:**

#### **a) ConventionRequest (Client → Server)**
```java
@Data
public class ConventionRequest {
    private Integer organisationPartenaireId;  // Which organization?
    private Integer userId;                    // Which user?
    private LocalDate dateDebut;               // Start date
    private LocalDate dateFin;                 // End date
}
```
**Purpose:** When the client sends a POST request to create a convention, it must provide these fields.

#### **b) ConventionResponse (Server → Client)**
```java
@Data
public class ConventionResponse {
    private Integer id;
    private String numeroConvention;
    private Integer userId;
    private Integer organisationPartenaireId;
    private String organisationPartenaireNom;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private List<ObjectifResponse> objectifs;  // Nested list of goals
    private StatutConvention statut;
    private LocalDate signedAt;
    private Boolean confirmeParUser;
    private Boolean confirmeParPartenaire;
    private String renouvellementDemandeParRole;
}
```
**Purpose:** When the server sends a response, it uses this structure. Notice it includes more info than ConventionRequest.

#### **c) ConventionMapper (Converter between Request/Entity/Response)**
```java
@Component
public class ConventionMapper {
    
    // Converts Request → Entity (for saving to DB)
    public Convention toEntity(ConventionRequest request, OrganisationPartenaire org) {
        Convention c = new Convention();
        c.setUserId(request.getUserId());
        c.setOrganisationPartenaire(org);
        c.setDateDebut(request.getDateDebut());
        // ... more fields
        return c;
    }
    
    // Converts Entity → Response (for sending to client)
    public ConventionResponse toResponse(Convention c) {
        ConventionResponse r = new ConventionResponse();
        r.setId(c.getId());
        r.setNumeroConvention(c.getNumeroConvention());
        // ... map all fields
        return r;
    }
}
```
**Purpose:** Translates between different object formats

**Why DTOs?**
- **Security:** Hide internal database fields from the client
- **Flexibility:** Change database structure without affecting API
- **Validation:** Validate incoming data in DTO
- **Performance:** Send only necessary fields to the client

---

### 3️⃣ **MODEL LAYER** (`model/Convention.java`)

**What it does:**
- Represents the **actual database entity**
- Defines the database table structure
- Maps to MySQL table `convention`

**Example:**
```java
@Entity                                    // This is a database table
@NoArgsConstructor                         // Auto-generate constructor with no arguments
@AllArgsConstructor                        // Auto-generate constructor with all fields
@Getter                                    // Auto-generate getters
@Setter                                    // Auto-generate setters
public class Convention {
    
    @Id                                    // Primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-increment
    private Integer id;
    
    private String numeroConvention;       // Convention number
    private Integer userId;                // User ID (reference to user-pi service)
    
    @ManyToOne                             // Many conventions → One organization
    @JoinColumn(name = "organisation_partenaire_id")
    private OrganisationPartenaire organisationPartenaire;
    
    private LocalDate dateDebut;           // Start date
    private LocalDate dateFin;             // End date
    
    @OneToMany(mappedBy = "convention")    // One convention → Many objectives
    private List<Objectif> objectifs;
    
    @Enumerated(EnumType.STRING)
    private StatutConvention statut;       // Status (DRAFT, SIGNED, ACTIVE, EXPIRED, etc.)
}
```

**Key Differences:**
| Aspect | Model | DTO |
|--------|-------|-----|
| **Purpose** | Represents database | Data transfer only |
| **Decorated with** | `@Entity`, `@NoArgsConstructor` | `@Data` |
| **Contains** | JPA annotations | Validation annotations |
| **Direct in DB?** | YES - saved to database | NO - temporary object |

---

### 4️⃣ **REPOSITORY LAYER** (`repository/ConventionRepository.java`)

**What it does:**
- Provides **database query methods**
- Extends `JpaRepository` (Spring Data JPA)
- No implementation needed — Spring generates it automatically!

**Example:**
```java
@Repository
public interface ConventionRepository extends JpaRepository<Convention, Integer> {
    // Spring generates methods automatically:
    
    // Find all conventions by user ID
    List<Convention> findByUserId(Integer userId);
    
    // Find by organization
    List<Convention> findByOrganisationPartenaireId(Integer orgId);
    
    // Custom query
    List<Convention> findByRenouvellementDemandeParRoleIsNotNull();
    
    // Inherited from JpaRepository (FREE methods):
    // findAll()
    // findById()
    // save()
    // delete()
    // deleteById()
}
```

**How it works:**
1. **Method naming convention:** `findBy` + `FieldName` + optional condition
2. Spring generates SQL automatically based on method name
3. `findByUserId(5)` → generates `SELECT * FROM convention WHERE user_id = 5`

**Query Breakdown:**
```
findByRenouvellementDemandeParRoleIsNotNull()
│      │                                    │
│      │                                    └─ WHERE field IS NOT NULL
│      └─ Field name in the entity
└─ Spring knows to generate a SELECT query
```

---

### 5️⃣ **SERVICE LAYER** (`service/ConventionService.java`)

**What it does:**
- Contains **all business logic**
- Calls Repository to get/save data
- Applies business rules
- Throws exceptions if rules are violated

**Example:**
```java
@Service
@RequiredArgsConstructor
public class ConventionService {
    
    private final ConventionRepository repository;
    private final ConventionMapper mapper;
    
    // ┌─ READ Operations ──────────────────────────────────────┐
    public List<ConventionResponse> getAll() {
        // 1. Call repository to fetch all from DB
        // 2. Convert each Convention → ConventionResponse
        // 3. Return list of responses
        return repository.findAll().stream().map(mapper::toResponse).toList();
    }
    
    // ┌─ CREATE Operations ────────────────────────────────────┐
    public ConventionResponse create(ConventionRequest request, String role) {
        // 1. Find the organization
        OrganisationPartenaire org = orgService.findById(request.getOrganisationPartenaireId());
        
        // 2. Convert request to entity
        Convention c = mapper.toEntity(request, org);
        
        // 3. Apply business logic: set initial state
        c.setModifieParRole(role);
        c.setConfirmeParUser(false);
        c.setConfirmeParPartenaire(false);
        
        // 4. Save to database
        Convention saved = repository.save(c);
        
        // 5. Generate convention number
        saved.setNumeroConvention("CONV-" + year + "-" + id);
        
        // 6. Save again and convert to response
        return mapper.toResponse(repository.save(saved));
    }
    
    // ┌─ UPDATE Operations ────────────────────────────────────┐
    public ConventionResponse update(Integer id, ConventionRequest request, String role) {
        // 1. Fetch existing from DB
        Convention existing = findById(id);
        
        // 2. Update fields
        existing.setDateDebut(request.getDateDebut());
        existing.setDateFin(request.getDateFin());
        
        // 3. Apply business rule: reset confirmations
        resetConfirmations(existing, role);
        
        // 4. Save and return
        return mapper.toResponse(repository.save(existing));
    }
    
    // ┌─ DELETE Operations ────────────────────────────────────┐
    public void delete(Integer id, String role, Integer userId) {
        // 1. Check authorization (is user allowed to delete?)
        checkOwnership(id, role, userId);
        
        // 2. Delete from database
        repository.deleteById(id);
    }
}
```

**Service Responsibilities:**
✅ Fetch data from repository  
✅ Apply business rules  
✅ Validate operations  
✅ Handle complex workflows  
✅ Throw exceptions for errors  
❌ Don't do database queries directly  
❌ Don't format HTTP responses  

---

## Spring Boot Annotations

### Core Annotations

#### **1. `@SpringBootApplication`**
```java
@SpringBootApplication
public class PartenariatPiApplication {
    public static void main(String[] args) {
        SpringApplication.run(PartenariatPiApplication.class, args);
    }
}
```
**What it does:**
- Marks the main entry point of the Spring Boot application
- Combines three annotations:
  - `@Configuration` - Enable bean creation
  - `@ComponentScan` - Find all components
  - `@EnableAutoConfiguration` - Auto-configure Spring

---

#### **2. `@RestController`**
```java
@RestController
@RequestMapping("/api/conventions")
public class ConventionController {
    // This class handles HTTP requests
}
```
**What it does:**
- Marks a class as a **REST API controller**
- All methods automatically return JSON responses
- Replaces `@Controller` + `@ResponseBody`

---

#### **3. `@Service`**
```java
@Service
public class ConventionService {
    // Business logic here
}
```
**What it does:**
- Marks a class as a **service** (business logic layer)
- Spring automatically creates an instance and manages it
- Similar to `@Component`, but semantically means "business logic"

---

#### **4. `@Repository`**
```java
@Repository
public interface ConventionRepository extends JpaRepository<Convention, Integer> {
    // Data access here
}
```
**What it does:**
- Marks a class/interface as a **data access object**
- Spring creates an implementation automatically
- Provides database query methods

---

#### **5. `@Component`**
```java
@Component
public class ConventionMapper {
    // Mapper logic here
}
```
**What it does:**
- Generic annotation for any Spring-managed bean
- Spring automatically creates an instance
- Used when class doesn't fit into other categories (Service, Repository, etc.)

---

#### **6. `@Configuration`**
```java
@Configuration
public class SecurityConfig {
    // Configuration here
}
```
**What it does:**
- Marks a class as a **configuration class**
- Contains `@Bean` methods inside
- Spring loads this once at startup

---

### Constructor & Field Annotations

#### **7. `@RequiredArgsConstructor`** (Lombok)
```java
@Service
@RequiredArgsConstructor
public class ConventionService {
    private final ConventionRepository repository;
    private final ConventionMapper mapper;
    
    // Lombok generates this constructor:
    // public ConventionService(ConventionRepository repository, ConventionMapper mapper) {
    //     this.repository = repository;
    //     this.mapper = mapper;
    // }
}
```
**What it does:**
- Auto-generates a constructor for `final` fields
- These fields are injected by Spring automatically
- This is called **Dependency Injection (DI)**

**Why use it?**
- Cleaner code (no manual constructor)
- Spring manages the dependencies
- Easy to test (can inject mock objects)

---

#### **8. `@NoArgsConstructor`** (Lombok)
```java
@Entity
@NoArgsConstructor
public class Convention {
    // Lombok generates:
    // public Convention() {}
}
```
**What it does:**
- Auto-generates a **no-argument constructor**
- JPA/Hibernate requires this for entity creation
- You never call it directly — JPA uses it internally

---

#### **9. `@AllArgsConstructor`** (Lombok)
```java
@Entity
@AllArgsConstructor
public class Convention {
    private Integer id;
    private String numeroConvention;
    
    // Lombok generates:
    // public Convention(Integer id, String numeroConvention) { ... }
}
```
**What it does:**
- Auto-generates a constructor with all fields as parameters
- Useful for creating fully-initialized objects

---

#### **10. `@Getter` / `@Setter`** (Lombok)
```java
@Data  // Includes @Getter, @Setter, @ToString, @EqualsAndHashCode
public class ConventionRequest {
    private Integer id;
    
    // Lombok generates:
    // public Integer getId() { return this.id; }
    // public void setId(Integer id) { this.id = id; }
}
```
**What it does:**
- Auto-generates getter/setter methods
- `@Data` includes all common annotations

---

#### **11. `@Data`** (Lombok)
```java
@Data
public class ConventionResponse {
    private Integer id;
    // Equivalent to:
    // @Getter
    // @Setter
    // @ToString
    // @EqualsAndHashCode
    // @RequiredArgsConstructor
}
```
**What it does:**
- Combines multiple Lombok annotations
- Generates getters, setters, toString, equals, hashCode
- Used mainly in DTOs

---

### HTTP Request Annotations

#### **12. `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`**
```java
@RestController
public class ConventionController {
    
    @GetMapping("/conventions")  // HTTP GET
    public List<Convention> getAll() { }
    
    @PostMapping("/conventions")  // HTTP POST (create)
    public Convention create(@RequestBody ConventionRequest req) { }
    
    @PutMapping("/conventions/{id}")  // HTTP PUT (update)
    public Convention update(@PathVariable Integer id) { }
    
    @DeleteMapping("/conventions/{id}")  // HTTP DELETE
    public void delete(@PathVariable Integer id) { }
    
    @PatchMapping("/conventions/{id}/status")  // HTTP PATCH (partial update)
    public Convention updateStatus(@PathVariable Integer id) { }
}
```
**What they do:**
- Map HTTP methods to Java methods
- Similar to Express.js in Node.js: `app.get()`, `app.post()`, etc.

---

#### **13. `@RequestBody`**
```java
@PostMapping
public ResponseEntity<ConventionResponse> create(
    @RequestBody ConventionRequest request  // Parse JSON from request body
) {
    return ResponseEntity.ok(conventionService.create(request));
}
```
**What it does:**
- Extracts JSON from HTTP request body
- Automatically converts JSON → Java object
- Validates fields marked with `@NotNull`, `@Valid`, etc.

**Example request:**
```json
POST /api/conventions
Content-Type: application/json

{
  "organisationPartenaireId": 1,
  "userId": 5,
  "dateDebut": "2025-01-01",
  "dateFin": "2025-12-31"
}
```
Spring automatically converts this JSON to `ConventionRequest` object.

---

#### **14. `@PathVariable`**
```java
@GetMapping("/conventions/{id}")
public Convention getById(@PathVariable Integer id) {
    // If request is GET /conventions/5
    // id = 5
}
```
**What it does:**
- Extracts value from URL path
- `{id}` placeholder gets mapped to the method parameter

---

#### **15. `@RequestHeader`**
```java
@GetMapping("/conventions")
public List<Convention> getAll(
    @RequestHeader("X-User-Role") String role,
    @RequestHeader("X-User-Id") Integer userId
) {
    // Reads HTTP headers
}
```
**What it does:**
- Extracts values from HTTP headers
- In your case: role and user ID come from API Gateway

**Example request:**
```
GET /api/conventions
X-User-Role: ROLE_ADMIN
X-User-Id: 5
```

---

#### **16. `@RequestParam`**
```java
@GetMapping("/conventions")
public List<Convention> search(
    @RequestParam String status,
    @RequestParam(required = false) Integer orgId
) {
    // If request is GET /conventions?status=ACTIVE&orgId=1
    // status = "ACTIVE", orgId = 1
}
```
**What it does:**
- Extracts query parameters from URL
- Similar to `req.query` in Express.js

---

### Database Annotations

#### **17. `@Entity`**
```java
@Entity  // This class represents a database table
public class Convention { }
```
**What it does:**
- Marks a class as a JPA entity
- Spring creates a database table named `convention`

---

#### **18. `@Id`**
```java
@Entity
public class Convention {
    @Id  // Primary key of the table
    private Integer id;
}
```
**What it does:**
- Marks a field as the primary key
- Uniquely identifies each row

---

#### **19. `@GeneratedValue`**
```java
@Entity
public class Convention {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
}
```
**What it does:**
- Auto-generates ID values
- `IDENTITY` strategy = auto-increment in MySQL
- You don't set ID — database does automatically

---

#### **20. `@ManyToOne`**
```java
@Entity
public class Convention {
    @ManyToOne  // Many conventions → One organization
    @JoinColumn(name = "organisation_partenaire_id")
    private OrganisationPartenaire organisationPartenaire;
}
```
**What it does:**
- Defines a Many-to-One relationship
- Multiple conventions can belong to one organization
- Creates a foreign key in the database

**Database result:**
```
convention table:
┌────┬──────────────────────────┬─────────────────────────────┐
│ id │ numero_convention        │ organisation_partenaire_id  │
├────┼──────────────────────────┼─────────────────────────────┤
│ 1  │ CONV-2025-0001           │ 1                           │
│ 2  │ CONV-2025-0002           │ 1  (← same organization)    │
│ 3  │ CONV-2025-0003           │ 2                           │
```

---

#### **21. `@OneToMany`**
```java
@Entity
public class Convention {
    @OneToMany(mappedBy = "convention", cascade = CascadeType.ALL)
    private List<Objectif> objectifs;
}
```
**What it does:**
- Defines a One-to-Many relationship
- One convention has many objectives
- `cascade = CascadeType.ALL` means if you delete convention, delete all its objectives too

**Database result:**
```
objectif table:
┌────┬──────────────┐
│ id │ convention_id│
├────┼──────────────┤
│ 1  │ 1           │
│ 2  │ 1           │
│ 3  │ 2           │
```

---

#### **22. `@Enumerated`**
```java
@Entity
public class Convention {
    @Enumerated(EnumType.STRING)
    private StatutConvention statut;  // Stored as text: "DRAFT", "SIGNED", "ACTIVE"
}
```
**What it does:**
- Stores enum values as strings in the database
- Alternative: `EnumType.ORDINAL` stores as numbers (not recommended)

**Database:**
```
status can be: "DRAFT", "SIGNED", "ACTIVE", "EXPIRED", "CANCELLED"
```

---

#### **23. `@Transient`**
```java
@Entity
public class Convention {
    @Transient  // NOT stored in database
    private String calculatedField;
}
```
**What it does:**
- Marks a field that should NOT be persisted
- Only exists in memory during object lifecycle

---

### Validation Annotations

#### **24. `@NotNull`**
```java
@Data
public class ConventionRequest {
    @NotNull(message = "Organization is required")
    private Integer organisationPartenaireId;
}
```
**What it does:**
- Validates that field is not null
- Returns error message if validation fails

**Error response:**
```json
{
  "error": "Organization is required"
}
```

---

#### **25. `@Valid`**
```java
@PostMapping
public ResponseEntity create(
    @Valid @RequestBody ConventionRequest request  // Trigger validation
) { }
```
**What it does:**
- Triggers validation of the DTO
- If validation fails, returns 400 Bad Request

---

### Bean Annotations

#### **26. `@Bean`**
```java
@Configuration
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Create a SecurityFilterChain bean
        return http.build();
    }
}
```
**What it does:**
- Marks a method that creates a **Spring Bean**
- Spring calls this method once and stores the result
- Other classes can request this bean via injection

**Difference between `@Bean` and `@Component`:**
| Feature | @Component | @Bean |
|---------|-----------|-------|
| **Applied to** | Classes | Methods |
| **Scope** | Auto-scanned | Manually defined |
| **Use case** | Your own classes | External libraries, complex setup |

**Example:**
```java
// Method 1: Using @Component (simple)
@Component
public class ConventionService { }

// Method 2: Using @Bean (for external libraries)
@Configuration
public class AppConfig {
    @Bean
    public DataSource dataSource() {
        // Setup and return a DataSource
        return new DataSource();
    }
}
```

---

#### **27. `@Autowired`** (Dependency Injection)
```java
@Service
public class ConventionService {
    
    @Autowired
    private ConventionRepository repository;
    
    // OR (preferred) using constructor injection:
    @RequiredArgsConstructor
    public ConventionService(ConventionRepository repository) {
        this.repository = repository;
    }
}
```
**What it does:**
- Tells Spring to inject a bean here
- Spring finds the matching bean and injects it
- Modern approach: use constructor injection with `@RequiredArgsConstructor`

---

### Method Annotations

#### **28. `@Transactional`**
```java
@Service
public class ConventionService {
    
    @Transactional
    public void transferConvention(Integer fromId, Integer toId) {
        // All database operations here are in ONE transaction
        // If any operation fails, ALL are rolled back
        convention1.setUserId(toId);
        repository.save(convention1);
        // If save fails, entire method is rolled back
    }
}
```
**What it does:**
- Wraps method in a database transaction
- All database operations are committed together
- If any fails, all are rolled back

---

## Request Flow Example

Let's trace a request from client to database:

### **Scenario: Client sends POST request to create a convention**

```
1. CLIENT → HTTP REQUEST
   POST /api/conventions
   Content-Type: application/json
   X-User-Role: ROLE_USER
   X-User-Id: 5
   
   {
     "organisationPartenaireId": 1,
     "userId": 5,
     "dateDebut": "2025-01-01",
     "dateFin": "2025-12-31"
   }

2. CONTROLLER LAYER (ConventionController.java)
   ├─ Method: create(@RequestBody ConventionRequest request, @RequestHeader String role)
   ├─ Spring extracts:
   │  ├─ JSON body → ConventionRequest object
   │  ├─ X-User-Role header → role parameter
   │  └─ Validation: @NotNull checks all required fields
   ├─ Authorization check: if user is creating for themselves
   └─ Calls: conventionService.create(request, role)

3. SERVICE LAYER (ConventionService.java)
   ├─ Method: create(ConventionRequest request, String role)
   ├─ Fetch organization: orgService.findById(1)
   ├─ Convert request to entity: mapper.toEntity(request, org)
   ├─ Apply business logic:
   │  ├─ Set initial status: DRAFT
   │  ├─ Set modifiedByRole: ROLE_USER
   │  ├─ Set confirmations: false
   │  └─ Generate convention number
   └─ Calls: repository.save(convention)

4. REPOSITORY LAYER (ConventionRepository.java)
   ├─ Spring-generated method: save(convention)
   └─ Calls JPA to save to database

5. DATABASE (MySQL)
   ├─ INSERT INTO convention VALUES (...)
   └─ Auto-generates ID = 42

6. RESPONSE FLOW (back to client)
   ├─ Repository returns saved entity (with ID)
   ├─ Service converts: Convention → ConventionResponse
   ├─ Controller wraps: ResponseEntity.ok(response)
   └─ Spring converts to JSON and sends to client

7. CLIENT ← HTTP RESPONSE
   HTTP 200 OK
   Content-Type: application/json
   
   {
     "id": 42,
     "numeroConvention": "CONV-2025-0042",
     "userId": 5,
     "organisationPartenaireId": 1,
     "dateDebut": "2025-01-01",
     "dateFin": "2025-12-31",
     "statut": "DRAFT",
     "confirmeParUser": false,
     "confirmeParPartenaire": false,
     "objectifs": []
   }
```

---

## Security & Authorization

### **How Authentication Works in Your System**

```
1. USER LOGS IN
   └─ Sends credentials to user-pi service
   └─ Receives JWT token

2. CLIENT REQUESTS CONVENTION
   GET /api/conventions
   Authorization: Bearer eyJhbGc...
   
3. API GATEWAY (not your code, but important)
   ├─ Validates JWT token
   ├─ Extracts user info from token
   ├─ Forwards request with headers:
   │  ├─ X-User-Id: 5
   │  └─ X-User-Role: ROLE_USER
   
4. YOUR SERVICE (Partenariat-PI)
   ├─ Receives request with X-User-Id and X-User-Role
   ├─ Controller reads these headers
   ├─ Service applies authorization rules
   └─ Returns data or error
```

---

### **Authorization in ConventionController**

```java
@GetMapping
public ResponseEntity<List<ConventionResponse>> getAll(
    @RequestHeader("X-User-Role") String role) {
    
    // Only ADMIN can view all conventions
    if (!"ROLE_ADMIN".equals(role))
        throw new RuntimeException("Access denied: ADMIN role required");
    
    return ResponseEntity.ok(conventionService.getAll());
}

@GetMapping("/user/{userId}")
public ResponseEntity<List<ConventionResponse>> getByUser(
    @PathVariable Integer userId,
    @RequestHeader("X-User-Id") Integer requestingUserId,
    @RequestHeader("X-User-Role") String role) {
    
    String r = cleanRole(role);
    
    // User can only see their own; ADMIN can see anyone
    if (!"ROLE_ADMIN".equals(r) && !requestingUserId.equals(userId))
        throw new RuntimeException("Access denied: you can only view your own conventions");
    
    return ResponseEntity.ok(conventionService.getByUserId(userId));
}
```

**Access Rules:**
- ✅ `ROLE_ADMIN` → Can do anything
- ✅ `ROLE_USER` (Entrepreneur) → Can see/edit only their own conventions
- ✅ `ROLE_PARTNER` (Organization) → Can see conventions with their organization

---

### **Role-Based Confirmation Logic**

Your system tracks who last modified a convention, so the OTHER party must confirm first:

```java
// In ConventionService.java

public ConventionResponse confirmer(Integer id, String role) {
    Convention existing = findById(id);
    
    // Rule 1: If YOU were the last to modify, the OTHER party must confirm first
    if (role.equals(existing.getModifieParRole())) {
        boolean otherHasConfirmed = "ROLE_USER".equals(role)
            ? Boolean.TRUE.equals(existing.getConfirmeParPartenaire())
            : Boolean.TRUE.equals(existing.getConfirmeParUser());
        
        if (!otherHasConfirmed) {
            throw new RuntimeException(
                "You made the last change — wait for the other party to confirm first"
            );
        }
    }
    
    // Rule 2: Set your confirmation
    if ("ROLE_USER".equals(role)) {
        existing.setConfirmeParUser(true);
    } else if ("ROLE_PARTNER".equals(role)) {
        existing.setConfirmeParPartenaire(true);
    }
    
    // Rule 3: If both confirmed, status → ACTIVE
    if (existing.getConfirmeParUser() && existing.getConfirmeParPartenaire()) {
        existing.setStatut(StatutConvention.ACTIVE);
    }
    
    return mapper.toResponse(repository.save(existing));
}
```

---

## File Organization Summary

```
src/main/java/org/example/partenariatpi/
│
├── PartenariatPiApplication.java          ← Main entry point (@SpringBootApplication)
│
├── config/
│   └── SecurityConfig.java                ← Configuration (@Configuration, @Bean)
│
├── controller/                            ← HTTP endpoints (@RestController)
│   ├── ConventionController.java
│   ├── ObjectifController.java
│   └── OrganisationPartenaireController.java
│
├── service/                               ← Business logic (@Service)
│   ├── ConventionService.java
│   ├── ObjectifService.java
│   └── OrganisationPartenaireService.java
│
├── repository/                            ← Database access (@Repository)
│   ├── ConventionRepository.java
│   ├── ObjectifRepository.java
│   └── OrganisationPartenaireRepository.java
│
├── model/                                 ← Database entities (@Entity)
│   ├── Convention.java
│   ├── Objectif.java
│   └── OrganisationPartenaire.java
│
├── dto/                                   ← Data transfer objects (@Data)
│   ├── ConventionRequest.java
│   ├── ConventionResponse.java
│   ├── ConventionMapper.java
│   ├── ObjectifRequest.java
│   ├── ObjectifResponse.java
│   ├── ObjectifMapper.java
│   └── ...
│
├── enums/                                 ← Enumerations
│   ├── StatutConvention.java
│   ├── StatutObjectif.java
│   ├── StatutPartenaire.java
│   ├── TypePartenaire.java
│   └── ResponsableObjectif.java
│
└── feign/                                 ← External service clients (Eureka + OpenFeign)
    ├── UserClient.java                    ← Call to user-pi service
    ├── UserDto.java
    └── FeignAuthInterceptor.java
```

---

## Summary Table

| Component | Purpose | Annotation | Example |
|-----------|---------|-----------|---------|
| **Controller** | HTTP endpoint handler | `@RestController` | `ConventionController` |
| **Service** | Business logic | `@Service` | `ConventionService` |
| **Repository** | Database queries | `@Repository` | `ConventionRepository` |
| **Model/Entity** | Database table | `@Entity` | `Convention.java` |
| **DTO Request** | Client input validation | `@Data`, `@NotNull` | `ConventionRequest` |
| **DTO Response** | Server output format | `@Data` | `ConventionResponse` |
| **Mapper** | Convert objects | `@Component` | `ConventionMapper` |
| **Config** | Application setup | `@Configuration` | `SecurityConfig` |
| **Bean** | Reusable component | `@Bean` | `SecurityFilterChain` |

---

## Key Takeaways

1. **Layered Architecture** keeps code organized and testable
2. **DTOs** protect your database schema from clients
3. **Repositories** provide database access without SQL
4. **Services** contain all business logic
5. **Controllers** handle HTTP requests/responses only
6. **Spring Annotations** reduce boilerplate code
7. **Dependency Injection** via `@RequiredArgsConstructor` makes code flexible
8. **Role-based authorization** ensures security
9. **Mappers** convert between different object types
10. **Lombok** (`@Data`, `@RequiredArgsConstructor`) saves typing

---

## Quick Reference: Common Commands

```bash
# Build the project
mvn clean package

# Run the application
mvn spring-boot:run

# Run tests
mvn test

# Check dependencies
mvn dependency:tree
```

---

**Happy coding! 🚀**


