
import jsPDF from 'jspdf';
import { MealPlan } from './api';

export const generateIngredientListPDF = (plan: MealPlan) => {
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

  // Helper function to get ingredients from a meal
  const getIngredientsFromMeal = (ingredients: string | string[]) => {
    if (typeof ingredients === 'string') {
      return ingredients.split(',').map(ingredient => ingredient.trim());
    }
    return Array.isArray(ingredients) ? ingredients : [];
  };

  // Title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Ingredients List', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 10;

  // Plan title
  doc.setFontSize(14);
  doc.text(plan.title, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 20;

  // Collect all ingredients from all meals
  const allIngredients = new Set<string>();
  
  plan.meals.forEach((dayMeal) => {
    [dayMeal.breakfast, dayMeal.lunch, dayMeal.dinner, dayMeal.snacks].forEach((meal) => {
      if (meal?.ingredients) {
        const ingredients = getIngredientsFromMeal(meal.ingredients);
        ingredients.forEach(ingredient => {
          if (ingredient.trim()) {
            allIngredients.add(ingredient.trim().toLowerCase());
          }
        });
      }
    });
  });

  // Sort ingredients alphabetically
  const sortedIngredients = Array.from(allIngredients).sort();

  // Add ingredients to PDF
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Complete Ingredients List:', 20, yPosition);
  yPosition += 10;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);

  sortedIngredients.forEach((ingredient, index) => {
    checkPageBreak(8);
    doc.text(`${index + 1}. ${ingredient}`, 20, yPosition);
    yPosition += 6;
  });

  // Generate filename
  const filename = `${plan.title.replace(/[^a-zA-Z0-9]/g, '_')}_ingredients_list.pdf`;
  
  // Save the PDF
  doc.save(filename);
};
