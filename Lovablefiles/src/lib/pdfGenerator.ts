import jsPDF from 'jspdf';
import { MealPlan, DailyMeals, Meal } from './api';

export const generateMealPlanPDF = (plan: MealPlan) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  let yPosition = 20;

  // Helper function to add new page if needed
  const checkPageBreak = (requiredHeight: number) => {
    if (yPosition + requiredHeight > pageHeight - 20) {
      doc.addPage();
      yPosition = 20;
    }
  };

  // Helper function to wrap text
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 10) => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, maxWidth);
    lines.forEach((line: string, index: number) => {
      doc.text(line, x, y + (index * fontSize * 0.4));
    });
    return lines.length * fontSize * 0.4;
  };

  // Helper function to handle ingredients whether they come as string or array
  const getIngredientsText = (ingredients: string | string[]) => {
    if (typeof ingredients === 'string') {
      return ingredients;
    }
    return Array.isArray(ingredients) ? ingredients.join(', ') : '';
  };

  // Title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(plan.title, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  // Plan details
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Duration: ${plan.duration} days`, 20, yPosition);
  yPosition += 8;
  doc.text(`Goal: ${plan.goal}`, 20, yPosition);
  yPosition += 8;
  doc.text(`Diet Preference: ${plan.diet_preference}`, 20, yPosition);
  yPosition += 8;
  doc.text(`Start Date: ${new Date(plan.start_date).toLocaleDateString()}`, 20, yPosition);
  yPosition += 15;

  // Description
  if (plan.description) {
    doc.setFont('helvetica', 'bold');
    doc.text('Description:', 20, yPosition);
    yPosition += 8;
    doc.setFont('helvetica', 'normal');
    const descHeight = addWrappedText(plan.description, 20, yPosition, pageWidth - 40, 10);
    yPosition += descHeight + 10;
  }

  // Meals for each day
  plan.meals.forEach((dayMeal: DailyMeals, index: number) => {
    checkPageBreak(50);
    
    // Day header
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(`Day ${dayMeal.day}`, 20, yPosition);
    yPosition += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(new Date(dayMeal.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }), 20, yPosition);
    yPosition += 15;

    // Daily summary
    const totals = [dayMeal.breakfast, dayMeal.lunch, dayMeal.dinner, dayMeal.snacks].reduce((acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fat: acc.fat + meal.fat
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

    doc.setFont('helvetica', 'bold');
    doc.text('Daily Summary:', 20, yPosition);
    yPosition += 8;
    doc.setFont('helvetica', 'normal');
    doc.text(`Calories: ${totals.calories} | Protein: ${totals.protein}g | Carbs: ${totals.carbs}g | Fat: ${totals.fat}g`, 20, yPosition);
    yPosition += 15;

    // Meals
    const meals = [
      { name: 'Breakfast', data: dayMeal.breakfast, icon: '🌅' },
      { name: 'Lunch', data: dayMeal.lunch, icon: '🌞' },
      { name: 'Dinner', data: dayMeal.dinner, icon: '🌙' },
      { name: 'Snacks', data: dayMeal.snacks, icon: '🍎' }
    ];

    meals.forEach((meal) => {
      if (meal.data) {
        checkPageBreak(40);
        
        // Meal header
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(`${meal.icon} ${meal.name}`, 20, yPosition);
        yPosition += 8;
        
        // Meal name
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(meal.data.name, 30, yPosition);
        yPosition += 6;
        
        // Nutrition info
        doc.setFont('helvetica', 'normal');
        doc.text(`${meal.data.calories} cal | P: ${meal.data.protein}g | C: ${meal.data.carbs}g | F: ${meal.data.fat}g`, 30, yPosition);
        yPosition += 6;
        
        // Ingredients
        if (meal.data.ingredients) {
          doc.setFont('helvetica', 'bold');
          doc.text('Ingredients:', 30, yPosition);
          yPosition += 6;
          doc.setFont('helvetica', 'normal');
          const ingredientsText = getIngredientsText(meal.data.ingredients);
          if (ingredientsText) {
            const ingredientsHeight = addWrappedText(ingredientsText, 30, yPosition, pageWidth - 60, 9);
            yPosition += ingredientsHeight + 3;
          }
        }
        
        // Instructions
        if (meal.data.instructions) {
          doc.setFont('helvetica', 'bold');
          doc.text('Instructions:', 30, yPosition);
          yPosition += 6;
          doc.setFont('helvetica', 'normal');
          const instructionsHeight = addWrappedText(meal.data.instructions, 30, yPosition, pageWidth - 60, 9);
          yPosition += instructionsHeight + 8;
        }
        
        yPosition += 5;
      }
    });

    yPosition += 10;
  });

  // Generate filename
  const filename = `${plan.title.replace(/[^a-zA-Z0-9]/g, '_')}_meal_plan.pdf`;
  
  // Save the PDF
  doc.save(filename);
};
