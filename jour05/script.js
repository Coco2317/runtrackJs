document.addEventListener("DOMContentLoaded", () => {

    const checkField = async (input) => {
        const value = input.value.trim();
        const errorEl = input.nextElementSibling;
        errorEl.textContent = "";

        // Vérifie si le champ est vide
        if (!value) {
            errorEl.textContent = "Ce champ est requis.";
            return false;
        }

        // Vérification spécifique selon le champ
        switch (input.id) {

            case "nom":
            case "prenom":
                
                if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\- ]{2,}$/.test(value)) {
                    errorEl.textContent = "Nom ou prénom invalide.";
                    return false;
                }
                
                if (/@/.test(value) || /\d/.test(value)) {
                    errorEl.textContent = "Un nom ne peut pas contenir d'email ou de chiffre.";
                    return false;
                }
                break;

            case "email":
                if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
                    errorEl.textContent = "Format d'email invalide.";
                    return false;
                }
                break;

            case "password":
            
                if (!/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}/.test(value)) {
                    errorEl.textContent = "8 caractères min., avec lettre, chiffre et symbole.";
                    return false;
                }
                break;

            case "confirmPassword":
                const pass = document.getElementById("password").value.trim();
                if (value !== pass) {
                    errorEl.textContent = "Les mots de passe ne correspondent pas.";
                    return false;
                }
                break;

            case "codePostal":
                if (!/^\d{5}$/.test(value)) {
                    errorEl.textContent = "Code postal à 5 chiffres requis.";
                    return false;
                }
                break;
        }

        await new Promise(r => setTimeout(r, 100));

        return true;
    };

    // Validation live sur saisie
    document.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", () => checkField(input));
    });

    // Validation complète au submit
    document.querySelectorAll("form").forEach(form => {
        form.addEventListener("submit", async e => {
            e.preventDefault();
            const inputs = form.querySelectorAll("input");
            const results = await Promise.all([...inputs].map(i => checkField(i)));
            if (results.every(ok => ok)) {
                alert("Formulaire valide et complet !");
            }
        });
    });
});
