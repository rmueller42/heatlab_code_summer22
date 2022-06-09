// REDV_UART.h
// 6/4/22 Ruth Mueller
/*
UART memory map for the RISC-V Thing Plus board, made referencing the 
EasyREDVIO.h file from E85 and the board's manual:
https://cdn.sparkfun.com/assets/7/f/0/2/7/fe310-g002-manual-v19p05.pdf 
*/


///////////////////////////////////////////////////////////////////////////////
// UART struct
///////////////////////////////////////////////////////////////////////////////

typedef struct
{
    volatile uint32_t tx_data       :   8; // Transmit data
    volatile uint32_t               :   23; // Reserved 
    volatile uint32_t full          :   1; // Transmit FIFO full
} txdata_bits_uart;

typedef struct
{
    volatile uint32_t rx_data       :   8; // Recieved data
    volatile uint32_t               :   23; // Reserved 
    volatile uint32_t empty         :   1; // Recieve FIFO full
} rxdata_bits_uart;

typedef struct
{
    volatile uint32_t txen          :   1; // Transmit enable
    volatile uint32_t nstop         :   1; // Number of stop bits
    volatile uint32_t               :   14; // Reserved
    volatile uint32_t txcnt         :   3; // Transmit watermark level
    volatile uint32_t               :   13; // Reserved
} txctrl_bits;

typedef struct
{
    volatile uint32_t rxen          :   1; // Transmit enable
    volatile uint32_t               :   15; // Reserved
    volatile uint32_t rxcnt         :   3; // Transmit watermark level
    volatile uint32_t               :   13; // Reserved
} rxctrl_bits;

typedef struct
{
    volatile uint32_t ie_txwm       :   1; // STransmit watermark interrupt enable
    volatile uint32_t ie_rxwm       :   1; // Recieve watermark interrupt enable
    volatile uint32_t               :   30; // Reserved
} ie_bits_uart;

typedef struct
{
    volatile uint32_t ip_txwm       :   1; // STransmit watermark interrupt pending
    volatile uint32_t ip_rxwm       :   1; // Recieve watermark interrupt pending
    volatile uint32_t               :   30; // Reserved
} ip_bits_uart;

typedef struct
{
    volatile uint32_t   div         :   16; // baud rate divisor, div_width bits wide, reset val is div_init
    volatile uint32_t               :   16;
} div_bits;


typedef struct
{
    volatile txdata_bits_uart    txdata;         // (UART offset 0x00) Transmit data register
    volatile rxdata_bits_uart    rxdata;         // (UART offset 0x04) Recieve data register
    volatile txctrl_bits         txctrl;         // (UART offset 0x08) Transmit control register
    volatile rxctrl_bits         rxctrl;         // (UART offset 0x0C) Receive control register
    volatile ie_bits_uart        ie;             // (UART offset 0x10) UART interrupt enable
    volatile ip_bits_uart        ip;             // (UART offset 0x14) UART interrupt pending
    volatile div_bits            div;            // (UART offset 0x18) Baud rate divisor
} UART;

///////////////////////////////////////////////////////////////////////////////
// UART bases Registers
///////////////////////////////////////////////////////////////////////////////

#define  UART0_BASE  (0x10013000)  // 3000 - 3FFF
#define  UART1_BASE  (0x10023000)

#define UART0 ((UART*) UART0_BASE)
#define UART1 ((UART*) UART1_BASE)






