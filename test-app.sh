#!/bin/bash


echo "🚀 Test de l'application TripWeaver"
echo "=================================="

echo "🔍 Vérification des prérequis..."

if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé"
    echo "📖 Installer Docker : https://docs.docker.com/get-docker/"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ Node.js/npm n'est pas installé"
    echo "📖 Installer Node.js : https://nodejs.org/"
    exit 1
fi

echo "✅ Prérequis OK"

echo ""
echo "📦 Installation des dépendances..."
npm install

echo ""
echo "🧪 Lancement des tests..."
npm run test

if [ $? -ne 0 ]; then
    echo "❌ Les tests ont échoué"
    exit 1
fi

echo "✅ Tests réussis"

echo ""
echo "📝 Vérification de la syntaxe..."
npm run lint

if [ $? -ne 0 ]; then
    echo "❌ Problèmes de syntaxe détectés"
    exit 1
fi

echo "✅ Syntaxe OK"

echo ""
echo "🐳 Test avec Docker..."

echo "🧹 Nettoyage..."
npm run docker:stop 2>/dev/null

echo "🏗️ Construction et lancement..."
npm run docker:dev

echo "⏳ Attente du démarrage (10 secondes)..."
sleep 10

echo "🔍 Test de l'application..."
if curl -f http://localhost:4200 >/dev/null 2>&1; then
    echo "✅ L'application fonctionne !"
    echo "🌐 Disponible sur : http://localhost:4200"
else
    echo "❌ L'application ne répond pas"
    echo "📋 Logs du container :"
    docker logs trip-weaver-dev
    exit 1
fi

echo ""
echo "🎉 Tout fonctionne parfaitement !"
echo ""
echo "📋 Prochaines étapes :"
echo "1. Visitez http://localhost:4200"
echo "2. Modifiez votre code"
echo "3. Poussez sur GitHub pour voir la CI/CD en action"
echo ""
echo "🛑 Pour arrêter : npm run docker:stop"
