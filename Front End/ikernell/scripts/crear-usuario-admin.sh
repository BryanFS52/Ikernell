#!/bin/bash

# Script para crear usuario coordinador usando curl
# Asegúrate de que el servidor backend esté corriendo en localhost:8080

API_URL="http://localhost:8080/api"

echo "🚀 Creando usuario coordinador con curl..."
echo ""

# Función para hacer peticiones curl con manejo de errores
make_request() {
    local method="$1"
    local endpoint="$2"
    local data="$3"
    
    echo "📡 ${method} ${API_URL}${endpoint}"
    
    if [ -n "$data" ]; then
        curl -X "$method" \
             -H "Content-Type: application/json" \
             -d "$data" \
             "$API_URL$endpoint" \
             -w "\nStatus: %{http_code}\n" \
             -s
    else
        curl -X "$method" \
             -H "Content-Type: application/json" \
             "$API_URL$endpoint" \
             -w "\nStatus: %{http_code}\n" \
             -s
    fi
    
    echo ""
}

echo "1️⃣ Verificando roles existentes..."
ROLES_RESPONSE=$(make_request "GET" "/roles")
echo "Respuesta roles: $ROLES_RESPONSE"
echo ""

echo "2️⃣ Verificando que existe el rol 'Coordinador de proyectos'..."
echo "Si no existe, debes crearlo manualmente en la base de datos."
echo "Los roles del sistema son: Coordinador de proyectos, Lider de proyectos, Desarrollador"
echo ""

echo "3️⃣ Creando usuario coordinador..."
USER_DATA='{
    "nombre": "Coordinador",
    "apellido": "Sistema", 
    "documento": "123456789",
    "usuario": "123456789",
    "contraseña": "admin123",
    "estado": true,
    "profesion": "Coordinador de Proyectos",
    "especialidad": "Gestión de Proyectos",
    "rol": {
        "idRol": 1,
        "nombre": "Coordinador de proyectos"
    }
}'

USER_RESPONSE=$(make_request "POST" "/personas" "$USER_DATA")
echo "Respuesta usuario creado: $USER_RESPONSE"
echo ""

echo "🎉 Proceso completado!"
echo ""
echo "🔐 Credenciales de acceso:"
echo "   Usuario: 123456789"
echo "   Contraseña: admin123"
echo ""
echo "💡 IMPORTANTE: Debes tener los roles iniciales creados en tu BD:" 
echo "   - Coordinador de proyectos (rol administrativo)"
echo "   - Lider de proyectos"
echo "   - Desarrollador"