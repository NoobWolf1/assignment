class CheckoutQueue {
    constructor(id) {
        this.id = id;
        this.customers = [];
        this.totalItems = 0;
    }

    addCustomer(itemCount) {
        this.customers.push(itemCount);
        this.totalItems += itemCount;
        return this.customers.length - 1;
    }

    getQueueInfo() {
        return {
            id: this.id,
            customers: [...this.customers],
            totalItems: this.totalItems,
            customerCount: this.customers.length
        };
    }
}

class CheckoutSystem {
    constructor(numberOfCheckouts) {
        this.checkouts = [];
        this.setupCheckouts(numberOfCheckouts);
    }

    setupCheckouts(count) {
        this.checkouts = [];
        for (let i = 0; i < count; i++) {
            this.checkouts.push(new CheckoutQueue(i + 1));
        }
    }

    assignCustomer(itemCount) {
        // Find checkout with the least items
        let minItemsIndex = 0;
        let minItems = this.checkouts[0].totalItems;

        for (let i = 1; i < this.checkouts.length; i++) {
            if (this.checkouts[i].totalItems < minItems) {
                minItems = this.checkouts[i].totalItems;
                minItemsIndex = i;
            }
        }

        // Assign customer to the checkout with least items
        const customerIndex = this.checkouts[minItemsIndex].addCustomer(itemCount);
        
        return {
            checkoutId: minItemsIndex + 1,
            customerIndex: customerIndex,
            itemCount: itemCount
        };
    }

    getAllCheckoutInfo() {
        return this.checkouts.map(checkout => checkout.getQueueInfo());
    }
}

class UI {
    constructor() {
        this.checkoutSystem = new CheckoutSystem(3); // Default 3 counters
        this.initEventListeners();
        this.renderCounters();
    }

    initEventListeners() {
        document.getElementById('checkout-btn').addEventListener('click', () => this.addCustomer());
        document.getElementById('items-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addCustomer();
            }
        });
    }

    addCustomer() {
        const itemsInput = document.getElementById('items-input');
        const itemCount = parseInt(itemsInput.value);
        
        if (isNaN(itemCount) || itemCount < 1) {
            alert('Please enter a valid number of items');
            return;
        }
        
        const result = this.checkoutSystem.assignCustomer(itemCount);
        this.renderCounters();
        this.highlightCounter(result.checkoutId);
        
        // Clear input field
        itemsInput.value = '';
        itemsInput.focus();
    }

    renderCounters() {
        const container = document.getElementById('counters-container');
        container.innerHTML = '';
        
        const countersInfo = this.checkoutSystem.getAllCheckoutInfo();
        
        countersInfo.forEach(counter => {
            const counterElement = document.createElement('div');
            counterElement.className = 'counter';
            counterElement.id = `counter-${counter.id}`;
            
            let customersText = counter.customerCount === 1 ? '1 customer' : `${counter.customerCount} customers`;
            
            let queueItemsHTML = '';
            counter.customers.forEach((itemCount, index) => {
                queueItemsHTML += `
                    <div class="queue-item">
                        <div class="items-count">
                            <svg class="cart-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 14.5C6 15.3284 5.32843 16 4.5 16C3.67157 16 3 15.3284 3 14.5C3 13.6716 3.67157 13 4.5 13C5.32843 13 6 13.6716 6 14.5Z" fill="currentColor"/>
                                <path d="M13 14.5C13 15.3284 12.3284 16 11.5 16C10.6716 16 10 15.3284 10 14.5C10 13.6716 10.6716 13 11.5 13C12.3284 13 13 13.6716 13 14.5Z" fill="currentColor"/>
                                <path d="M2 2H3.5L5.5 10H11L13 4H4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            ${itemCount === 1 ? '1 item' : `${itemCount} items`}
                        </div>
                        <button class="remove-btn">—</button>
                    </div>
                `;
            });
            
            counterElement.innerHTML = `
                <div class="counter-header">
                    <div class="counter-title">Counter ${counter.id}</div>
                    <div class="customers-count">
                        <svg class="person-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M3 14C3 12.3431 5.23858 11 8 11C10.7614 11 13 12.3431 13 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        ${customersText}
                    </div>
                </div>
                ${queueItemsHTML}
                ${counter.totalItems > 0 ? 
                    `<div class="counter-footer">
                        Total Items: ${counter.totalItems}
                    </div>` : ''}
            `;
            
            container.appendChild(counterElement);
        });
    }

    highlightCounter(counterId) {
        const counterElement = document.getElementById(`counter-${counterId}`);
        counterElement.classList.add('counter', 'active-highlight');
        setTimeout(() => {
            counterElement.classList.remove('active-highlight');
        }, 2000);
    }
}

// Initialize the app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new UI();
});