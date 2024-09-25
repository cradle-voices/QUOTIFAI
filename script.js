// script.js
document.getElementById('quotationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const reinsured = document.getElementById('reinsured').value;
    const broker = document.getElementById('broker').value;
    const insured = document.getElementById('insured').value;
    const partners = document.getElementById('partners').value;
    const qualifiedAssistants = document.getElementById('qualifiedAssistants').value;
    const annualFees = document.getElementById('annualFees').value;
    const indemnityLimit = document.getElementById('indemnityLimit').value;
    const profession = document.getElementById('profession').value;

    // Premium Calculation
    const partnerCost = partners * 3000;
    const qualifiedAssistantCost = qualifiedAssistants * 2500;
    const annualFeesPercentage = (annualFees * 0.00115).toFixed(2);
    const indemnityPercentage = (indemnityLimit * 4.5).toFixed(2);
    const basePremium = (parseFloat(partnerCost) + parseFloat(qualifiedAssistantCost) + parseFloat(annualFeesPercentage) + parseFloat(indemnityPercentage)).toFixed(2);

    // Optional Extensions
    let extensionsCost = 0;
    let extensionsDetails = '';

    const lossOfDocumentsPercentage = document.getElementById('lossOfDocuments').value || 0;
    const libelAndSlanderPercentage = document.getElementById('libelAndSlander').value || 0;
    const dishonestyOfEmployeesPercentage = document.getElementById('dishonestyOfEmployees').value || 0;

    if (lossOfDocumentsPercentage > 0) {
        const lossOfDocumentsCost = ((indemnityLimit * (lossOfDocumentsPercentage / 100)).toFixed(2));
        extensionsCost += parseFloat(lossOfDocumentsCost);
        extensionsDetails += `LOSS OF DOCUMENTS @ ${lossOfDocumentsPercentage}% OF LOI \t\t${lossOfDocumentsCost}\n`;
    }

    if (libelAndSlanderPercentage > 0) {
        const libelCost = ((indemnityLimit * (libelAndSlanderPercentage / 100)).toFixed(2));
        extensionsCost += parseFloat(libelCost);
        extensionsDetails += `LIBEL & SLANDER @ ${libelAndSlanderPercentage}% OF LOI \t\t${libelCost}\n`;
    }

    if (dishonestyOfEmployeesPercentage > 0) {
        const dishonestyCost = ((indemnityLimit * (dishonestyOfEmployeesPercentage / 100)).toFixed(2));
        extensionsCost += parseFloat(dishonestyCost);
        extensionsDetails += `DISHONESTY OF EMPLOYEES @ ${dishonestyOfEmployeesPercentage}% OF LOI \t\t${dishonestyCost}\n`;
    }

    // Total Premium Calculation
    const totalPremium = (parseFloat(basePremium) + extensionsCost).toFixed(2);
    const levies = (totalPremium * 0.0045).toFixed(2);  // Sample levy percentage (0.45%)
    const sd = 40; // Sample stamp duty
    const grandTotalPremium = (parseFloat(totalPremium) + parseFloat(levies) + sd).toFixed(2);

    // Generate Quotation Content
    const quotation = `
    REINSURED: ${reinsured}
    BROKER: ${broker}
    INSURED: ${insured}

    PROFESSIONAL INDEMNITY QUOTATION

    Partners/Principal: ${partners} @ 3,000.00 = ${partnerCost}
    Qualified Assistants: ${qualifiedAssistants} @ 2,500.00 = ${qualifiedAssistantCost}
    Annual Fees: ${annualFees} @ 0.115% = ${annualFeesPercentage}
    Limit of Indemnity: ${indemnityLimit} @ 450% = ${indemnityPercentage}

    Profession: ${profession}

    Base Premium: ${basePremium}

    Extensions:
    ${extensionsDetails}

    BASIC PREMIUM: ${totalPremium}
    LEVIES: ${levies}
    SD: ${sd}
    TOTAL PREMIUM: ${grandTotalPremium}

    Conditions:
    - Claims made basis
    - Jurisdiction (Kenya)
    - Territorial Scope (East Africa)
    - No Retroactive Cover
    - Cost inclusive clause

    Excess:
    0.2% of the LOI

    Facultative Support:
    50% of LOI

    Subject to:
    - Total Deductions: 27.5%
    - PPW: 90 Days

    Note:
    Kindly be advised that this is only a quotation and no cover is given.
    Tentative terms pending provision of Audited accounts for the last 3 years.

    STANDARD CEDANT PI POLICY TERMS TO APPLY
    `;

    // Display Quotation
    document.getElementById('quotationContent').textContent = quotation;
    document.getElementById('quotationResult').style.display = 'block';
});
