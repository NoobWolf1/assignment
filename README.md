# Hypermart Checkout System

A real-time queue management system for hypermart checkout counters that assigns customers to the checkout with the fewest items.

## Overview

This project implements an efficient checkout assignment algorithm for retail environments. When a customer arrives, they are automatically assigned to the checkout counter with the least number of items in its queue, optimizing wait times and balancing load across all checkout counters.

## Features

- Dynamic assignment of customers to checkout counters with minimal waiting time
- Real-time visual representation of checkout queues
- Instant feedback when a new customer is assigned to a counter
- Simple and intuitive user interface

## Technical Implementation

The project is built using vanilla JavaScript, HTML, and CSS with an object-oriented design pattern:

- **index.html**: Contains the structure and layout of the application
- **style.css**: Handles all styling and visual aspects of the UI
- **script.js**: Implements the core logic and algorithms

## Core Components

1. **CheckoutQueue Class**  
   Manages each individual checkout counter's queue of customers and item counts.

2. **CheckoutSystem Class**  
   Coordinates the entire system by determining which counter a new customer should be assigned to based on the current state of all queues.

3. **UI Class**  
   Handles all user interface interactions, rendering, and visual feedback.

## Algorithm Analysis

### Time Complexity

The core algorithm for assigning a customer to a checkout counter has a time complexity of **O(n)**, where `n` is the number of checkout counters.

- For each new customer:
  - The algorithm iterates through all checkout counters to find the one with the minimum total items.
  - This requires examining each counter exactly once.
  - In the worst case, we need to check all `n` counters.

While **O(n)** is efficient for small to medium-sized applications (typical retail scenarios with 3-20 checkout counters), for larger applications, this could be optimized to **O(log n)** using a priority queue (min heap) data structure.

### Space Complexity

The space complexity of the solution is **O(n + m)**, where:

- `n` is the number of checkout counters.
- `m` is the total number of customers across all counters.

Each counter stores its queue of customers and the total number of items, making the space requirement directly proportional to the number of customers being served.

## Assumptions

- **Equal Processing Capacity**: All checkout counters process customers at the same rate, so the only factor in wait time is the total number of items.
- **FIFO Processing**: Customers are served in First-In-First-Out order at each counter.
- **Atomic Assignment**: Once a customer is assigned to a checkout counter, they do not switch to another counter even if conditions change.
- **Valid Input**: Users enter valid numbers for item counts (positive integers).
- **Single Metric Optimization**: The assignment is optimized only based on the total number of items, not considering other factors like checkout operator efficiency or customer types.

## Potential Improvements

- **Persistence**: Add local storage to maintain the state across page reloads.
- **Advanced Assignment**: Implement more sophisticated assignment algorithms that consider additional factors beyond just the total item count.
- **Simulation Mode**: Add features to simulate customers finishing checkout and leaving the queue.
- **Performance Optimization**: For very large-scale applications, implement a priority queue for **O(log n)** assignment time.
- **Statistics**: Add real-time statistics and historical data visualization.