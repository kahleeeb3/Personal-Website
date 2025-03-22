#include <stdio.h>
#include <math.h>
#include "U8glib.h"

// define varaiables for the plot
int x1 = 12;
int x2 = 128;
int y1 = 0;
int y2 = 48;
int width = x2 - x1;
int height = y2 - y1;

double scale = 1; // define the zoom scale

int size = width/scale;

int sensorPin = A0;    // select the input pin for the potentiometer
int sensorValue = 0;  // variable to store the value coming from the sensor

// SETUP
U8GLIB_SSD1306_128X64 u8g(U8G_I2C_OPT_NONE | U8G_I2C_OPT_DEV_0);

/*
 * these 3 function were taken from
 * https://www.geeksforgeeks.org/convert-floating-point-number-string/
 * they are used to convert floats to strings
 */
void reverse(char* str, int len)
{
  int i = 0, j = len - 1, temp;
  while (i < j) {
    temp = str[i];
    str[i] = str[j];
    str[j] = temp;
    i++;
    j--;
  }
}

int intToStr(int x, char str[], int d)
{
  int i = 0;
  while (x) {
    str[i++] = (x % 10) + '0';
    x = x / 10;
  }

  // If number of digits required is more, then
  // add 0s at the beginning
  while (i < d)
    str[i++] = '0';

  reverse(str, i);
  str[i] = '\0';
  return i;
}

void ftoa(float n, char* res, int afterpoint)
{
  // Extract integer part
  int ipart = (int)n;

  // Extract floating part
  float fpart = n - (float)ipart;

  // convert integer part to string
  int i = intToStr(ipart, res, 0);

  // check for display option after point
  if (afterpoint != 0) {
    res[i] = '.'; // add dot

    // Get the value of fraction part upto given no.
    // of points after dot. The third parameter
    // is needed to handle cases like 233.007
    fpart = fpart * pow(10, afterpoint);

    intToStr((int)fpart, res + i + 1, afterpoint);
  }
}

/*
 * Below is my code
 */
 
// defines the boxes the plot goes in
void draw(void) {
  // graphic commands to redraw the complete screen should be placed here
  u8g.drawStr(0, 7, "5");
  u8g.drawStr(0, (u8g.getHeight() - 14) / 2, "0");
  u8g.drawStr(0, u8g.getHeight() - 17, "-5");

  // Top Frame Box
  u8g.drawFrame(x1, y1, width, y2);
  // Horizontal Line
  u8g.drawLine(x1, height / 2, x2, height / 2);
  // Bottom Frame Box
  u8g.drawFrame(0, u8g.getHeight() - 16, u8g.getWidth(), 16);
}

// displays the function on the LCD screen
void plot(int peak1, int peak2, float freq, int max, int min, unsigned int data[500]) {
  // Calculate the Pk-Pk
  float pkpk = (max - min) / 50.0; // finding distance from peak to peak
  float adjusted = (pkpk+0.5353)/0.9696; // adjusted to fit the error
  char pp[20];
  ftoa(adjusted, pp, 2);

  // Convert frequency to String
  char f[20];
  ftoa(freq, f, 2);

  // Plot The Wave
  if (scale >1){
    for (int i = 0; i < size; i++) {
      u8g.drawLine((i*scale) + x1, y2 - data[i], (i*scale) + x1 + 1, y2 - data[i + 1]);
    }
  }
  else{
    int factor = 1/scale;
    for (int i = 0; i < size; i++) {
      if(i%factor == 0){
        u8g.drawLine((int)(i*scale) + x1, y2 - data[i], (int) (i*scale) + x1 + 1, y2 - data[i + 1]);
      }
    }
  }
  s
  //Draw lines for period
  u8g.drawLine(x1 + (peak1*scale), 0, x1 + (peak1*scale), height);
  u8g.drawLine(x1 + (peak2*scale), 0, x1 + (peak2*scale), height);

  // Write the data
  u8g.drawStr(70, u8g.getHeight() - 2, "Freq: ");
  if (freq != INFINITY) {
    u8g.drawStr(95, u8g.getHeight() - 2, f);
  }
  u8g.drawStr(2, u8g.getHeight() - 2, "Pk-Pk: ");
  u8g.drawStr(30, u8g.getHeight() - 2, pp);
}

// returns an edited array with centered data
unsigned int * center(int max, int min, unsigned int * data) {
  //Center The Data
  for (int i = 0; i < size; i++) {
    data[i] = ((data[i] - min) / 10);
  }
  return data;
}

void peaks(unsigned int data[500], int* peak1, int* peak2)
{
  int max = data[0];
  int min = data[0];

  for (int i = 1; i < size; i++) {
    // Check if we are increasing
    if (data[i] > max) {
      max = data[i];
      *peak1 = i;
    }
    // if we are not increasing
    else if (*peak1 > 0) {
      break;
    }
  }

  // Find second peak
  for (int i = *peak1; i < size; i++) {
    // Check if we are increasing
    if (data[i] < min) {
      min = data[i];
      *peak2 = i;
    }
    // if we are not increasing
    else if (*peak2 > 0) {
      break;
    }
  }
  *peak2 = (*peak2 - *peak1) + *peak2;
}

void amplitude(unsigned int data[500], int* max, int* min)
{
  *max = data[0];
  *min = data[0];
  // Find Real Max-Min
  for (int i = 0; i < size; i++) {
    // Check if we are increasing
    if (data[i] > *max) {
      *max = data[i];
    }
    if (data[i] < *min) {
      *min = data[i];
    }
  }
}


void setup() {
  // screen rotation
  u8g.setRot180();
  // set font
  u8g.setFont(u8g_font_4x6);
  // begin the serial monitor @ 9600 baud
  Serial.begin(9600);
  // GREEN LED
  pinMode(13, OUTPUT);
}

void loop() {

  // collect the value from the sensor:
  unsigned int data[size];
  float time[size];
  float start = millis();

  for (int i = 0; i < size; i++) {
    data[i] = analogRead(sensorPin);
    time[i] = millis() - start;
  }
  
  //Find the Frequency
  int peak1 = 0;int peak2 = 0;
  peaks(data, &peak1, &peak2);
  float dt = (time[peak2] - time[peak1])/1000;
  float freq = 1 /dt;

  // FIND THE MIN/MAX
  int max, min;
  amplitude(data, &max, &min);

  //Scale the Values in the Array
  unsigned int *newData = center(max, min, data);


  /**********************************/
  /*
  for (int i = 0; i < width; i++) {
    //Serial.println(newData[i]);
    //Serial.println(time[i]);
  }
  */
  /**********************************/

  // cycles through the plot function
  u8g.firstPage();
  do {
    draw();
    plot(peak1, peak2, freq, max, min, newData);
  }
  while ( u8g.nextPage() );
  
  // rebuild the picture after some delay
  delay(1000);

}
