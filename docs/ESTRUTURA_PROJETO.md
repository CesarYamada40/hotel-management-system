# Estrutura do Projeto Hotel Management System

## Arquitetura Geral

```mermaid
graph TD
    A[Frontend - React Native] --> B[API Services]
    B --> C[Backend - FastAPI]
    C --> D[Supabase]
    D --> E[PostgreSQL Database]
```

## Estrutura de Diretórios

```
hotel-management-system/
├── src/                      # Código fonte principal
│   ├── components/           # Componentes React reutilizáveis
│   ├── config/              # Configurações do projeto
│   ├── context/             # Contextos React (Auth, Theme, etc)
│   ├── hooks/               # Hooks personalizados
│   ├── navigation/          # Configuração de rotas
│   ├── screens/             # Telas do aplicativo
│   │   ├── Reservar/       # Tela de reservas
│   │   ├── access/         # Controle de acesso
│   │   ├── checkin/        # Check-in/out
│   │   ├── dashboard/      # Painel principal
│   │   ├── explore/        # Explorar quartos
│   │   ├── menu/          # Menu principal
│   │   ├── payments/      # Pagamentos
│   │   ├── profile/       # Perfil do usuário
│   │   ├── reservations/  # Gerenciamento de reservas
│   │   ├── roomservice/   # Serviço de quarto
│   │   └── shop/         # Loja/Serviços extras
│   ├── services/          # Serviços de API
│   │   ├── ReservationService.ts
│   │   ├── SyncService.ts
│   │   └── api.ts
│   └── utils/             # Funções utilitárias
├── backend/               # Backend FastAPI
│   ├── app/              # Código fonte do backend
│   ├── alembic/          # Migrações do banco
│   └── tests/            # Testes do backend
└── supabase/             # Configuração Supabase
    ├── migrations/       # Migrações do banco
    └── seed.sql         # Dados iniciais

```

## Fluxo de Dados

### Reservas
```mermaid
sequenceDiagram
    participant U as Usuário
    participant F as Frontend
    participant B as Backend
    participant S as Supabase
    
    U->>F: Seleciona datas
    F->>B: Verifica disponibilidade
    B->>S: Query quartos disponíveis
    S-->>B: Lista de quartos
    B-->>F: Quartos disponíveis
    U->>F: Seleciona quarto
    F->>B: Cria reserva
    B->>S: Insere reserva
    S-->>B: Confirmação
    B-->>F: Reserva confirmada
```

### Check-in
```mermaid
sequenceDiagram
    participant U as Usuário
    participant F as Frontend
    participant B as Backend
    participant S as Supabase
    
    U->>F: Apresenta código
    F->>B: Valida código
    B->>S: Verifica reserva
    S-->>B: Dados da reserva
    B-->>F: Confirmação
    F->>U: Cartão de acesso
```

## Banco de Dados

### Tabelas Principais
- rooms (Quartos)
- guests (Hóspedes)
- reservations (Reservas)
- access_cards (Cartões de Acesso)
- payments (Pagamentos)

### Relacionamentos
```mermaid
erDiagram
    GUESTS ||--o{ RESERVATIONS : has
    ROOMS ||--o{ RESERVATIONS : contains
    RESERVATIONS ||--o| ACCESS_CARDS : generates
    RESERVATIONS ||--o{ PAYMENTS : requires
```

## Serviços API

### ReservationService
- Criação de reservas
- Consulta de disponibilidade
- Gerenciamento de check-in/out
- Geração de cartões de acesso

### SyncService
- Sincronização de dados offline
- Cache de informações
- Gestão de conflitos

### API Principal
- Autenticação
- CRUD de entidades
- Integração com Supabase
