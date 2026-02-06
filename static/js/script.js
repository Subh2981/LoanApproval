// Form validation and interactivity
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loanForm');
    const submitBtn = form.querySelector('.btn-primary');
    
    // Form field validation rules
    const validationRules = {
        age: {
            min: 18,
            max: 100,
            message: 'Age must be between 18 and 100'
        },
        income: {
            min: 0,
            message: 'Income must be a positive number'
        },
        exp: {
            min: 0,
            max: 50,
            message: 'Experience must be between 0 and 50 years'
        },
        credit_score: {
            min: 300,
            max: 850,
            message: 'Credit score must be between 300 and 850'
        },
        loan_amnt: {
            min: 0,
            message: 'Loan amount must be positive'
        },
        loan_int_rate: {
            min: 0,
            max: 100,
            message: 'Interest rate must be between 0 and 100'
        }
    };

    // Real-time validation for input fields
    const inputs = form.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            if (this.parentElement.classList.contains('error')) {
                validateField(this);
            }
        });
    });

    // Validate individual field
    function validateField(field) {
        const fieldName = field.name;
        const value = parseFloat(field.value);
        const formGroup = field.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (!field.value) {
            showError(formGroup, errorElement, 'This field is required');
            return false;
        }

        if (validationRules[fieldName]) {
            const rules = validationRules[fieldName];
            
            if (rules.min !== undefined && value < rules.min) {
                showError(formGroup, errorElement, rules.message);
                return false;
            }
            
            if (rules.max !== undefined && value > rules.max) {
                showError(formGroup, errorElement, rules.message);
                return false;
            }
        }
        
        clearError(formGroup, errorElement);
        return true;
    }

    // Show error message
    function showError(formGroup, errorElement, message) {
        formGroup.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    // Clear error message
    function clearError(formGroup, errorElement) {
        formGroup.classList.remove('error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }

    // Form submission validation
    form.addEventListener('submit', function(e) {
        let isValid = true;
        
        // Validate all number inputs
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        // Validate required select fields
        const selects = form.querySelectorAll('select[required]');
        selects.forEach(select => {
            if (!select.value) {
                isValid = false;
                const formGroup = select.parentElement;
                formGroup.classList.add('error');
            }
        });

        // Validate radio buttons
        const genderRadios = form.querySelectorAll('input[name="Gender"]');
        const genderChecked = Array.from(genderRadios).some(radio => radio.checked);
        if (!genderChecked) {
            isValid = false;
            alert('Please select a gender');
        }

        if (!isValid) {
            e.preventDefault();
            // Scroll to first error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            // Add loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Store scroll intent for after page reload
            sessionStorage.setItem('scrollToResult', 'true');
        }
    });

    // Auto-format currency inputs
    const currencyInputs = ['income', 'loan_amnt'];
    currencyInputs.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('blur', function() {
                if (this.value) {
                    const value = parseFloat(this.value);
                    if (!isNaN(value)) {
                        this.value = Math.round(value);
                    }
                }
            });
        }
    });

    // Calculate loan-to-income ratio display
    const loanAmntField = document.getElementById('loan_amnt');
    const incomeField = document.getElementById('income');
    
    if (loanAmntField && incomeField) {
        const calculateRatio = () => {
            const loanAmount = parseFloat(loanAmntField.value);
            const income = parseFloat(incomeField.value);
            
            if (loanAmount && income && income > 0) {
                const ratio = (loanAmount / income * 100).toFixed(2);
                
                // Create or update ratio display
                let ratioDisplay = form.querySelector('.ratio-display');
                if (!ratioDisplay) {
                    ratioDisplay = document.createElement('div');
                    ratioDisplay.className = 'ratio-display';
                    ratioDisplay.style.cssText = `
                        background: linear-gradient(135deg, #eff6ff, #dbeafe);
                        padding: 1rem;
                        border-radius: 8px;
                        margin-top: 1rem;
                        border-left: 4px solid #3b82f6;
                        font-weight: 600;
                        color: #1e40af;
                    `;
                    loanAmntField.parentElement.appendChild(ratioDisplay);
                }
                
                ratioDisplay.innerHTML = `
                    <i class="fas fa-calculator"></i> 
                    Loan-to-Income Ratio: ${ratio}%
                    ${ratio > 40 ? '<span style="color: #dc2626;"> (High Risk)</span>' : 
                      ratio > 30 ? '<span style="color: #f59e0b;"> (Moderate)</span>' : 
                      '<span style="color: #10b981;"> (Good)</span>'}
                `;
            }
        };
        
        loanAmntField.addEventListener('input', calculateRatio);
        incomeField.addEventListener('input', calculateRatio);
    }

    // Check if we should scroll to result (after form submission)
    const resultBanner = document.querySelector('.result-banner');
    if (resultBanner && sessionStorage.getItem('scrollToResult') === 'true') {
        sessionStorage.removeItem('scrollToResult');
        setTimeout(() => {
            resultBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }

    // Form reset handling
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            console.log('Reset button clicked'); // Debug log
            
            // Remove result banner first (most important)
            const resultBanner = document.querySelector('.result-banner');
            if (resultBanner) {
                console.log('Removing result banner'); // Debug log
                resultBanner.style.animation = 'slideUp 0.3s ease';
                setTimeout(() => {
                    resultBanner.remove();
                }, 300);
            }
            
            // Reset the form
            form.reset();
            
            // Clear all errors
            const errorGroups = form.querySelectorAll('.form-group.error');
            errorGroups.forEach(group => {
                group.classList.remove('error');
                const errorMsg = group.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.style.display = 'none';
                }
            });
            
            // Remove all dynamic elements
            const dynamicElements = [
                '.ratio-display',
                '.credit-indicator', 
                '.intent-tooltip'
            ];
            
            dynamicElements.forEach(selector => {
                const element = document.querySelector(selector);
                if (element) {
                    element.remove();
                }
            });
            
            // Scroll to top of form
            setTimeout(() => {
                const formHeader = document.querySelector('.form-header');
                if (formHeader) {
                    formHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        });
    }

    // Credit score indicator
    const creditScoreField = document.getElementById('credit_score');
    if (creditScoreField) {
        creditScoreField.addEventListener('input', function() {
            const score = parseFloat(this.value);
            let indicator = this.parentElement.querySelector('.credit-indicator');
            
            if (score >= 300 && score <= 850) {
                if (!indicator) {
                    indicator = document.createElement('div');
                    indicator.className = 'credit-indicator';
                    indicator.style.cssText = `
                        margin-top: 0.5rem;
                        padding: 0.5rem;
                        border-radius: 5px;
                        font-size: 0.9rem;
                        font-weight: 600;
                        text-align: center;
                    `;
                    this.parentElement.appendChild(indicator);
                }
                
                let rating, color;
                if (score >= 750) {
                    rating = 'Excellent';
                    color = '#10b981';
                } else if (score >= 700) {
                    rating = 'Good';
                    color = '#3b82f6';
                } else if (score >= 650) {
                    rating = 'Fair';
                    color = '#f59e0b';
                } else if (score >= 600) {
                    rating = 'Poor';
                    color = '#ef4444';
                } else {
                    rating = 'Very Poor';
                    color = '#dc2626';
                }
                
                indicator.style.backgroundColor = color + '20';
                indicator.style.color = color;
                indicator.textContent = `Credit Rating: ${rating}`;
            } else if (indicator) {
                indicator.remove();
            }
        });
    }

    // Add tooltips for loan intent
    const loanIntentSelect = document.getElementById('loan');
    if (loanIntentSelect) {
        const tooltips = {
            'PERSONAL': 'For personal expenses and general use',
            'EDUCATION': 'For educational purposes and student fees',
            'MEDICAL': 'For healthcare and medical expenses',
            'VENTURE': 'For business ventures and startups',
            'HOMEIMPROVEMENT': 'For home renovation and improvements',
            'DEBTCONSOLIDATION': 'To consolidate existing debts'
        };
        
        loanIntentSelect.addEventListener('change', function() {
            let tooltip = this.parentElement.querySelector('.intent-tooltip');
            
            if (this.value && tooltips[this.value]) {
                if (!tooltip) {
                    tooltip = document.createElement('div');
                    tooltip.className = 'intent-tooltip';
                    tooltip.style.cssText = `
                        margin-top: 0.5rem;
                        padding: 0.75rem;
                        background: #eff6ff;
                        border-left: 3px solid #3b82f6;
                        border-radius: 5px;
                        font-size: 0.9rem;
                        color: #1e40af;
                    `;
                    this.parentElement.appendChild(tooltip);
                }
                tooltip.innerHTML = `<i class="fas fa-info-circle"></i> ${tooltips[this.value]}`;
            } else if (tooltip) {
                tooltip.remove();
            }
        });
    }

    // Prevent form resubmission on page refresh
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }
});

// Add entrance animations
window.addEventListener('load', function() {
    const formWrapper = document.querySelector('.form-wrapper');
    if (formWrapper) {
        formWrapper.style.opacity = '0';
        formWrapper.style.transform = 'translateY(20px)';
        formWrapper.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            formWrapper.style.opacity = '1';
            formWrapper.style.transform = 'translateY(0)';
        }, 100);
    }
});