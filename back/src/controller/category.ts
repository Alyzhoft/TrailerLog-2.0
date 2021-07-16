import { prisma } from "../utils/prisma";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany();

    return categories;
  } catch (error) {
    return { error };
  }
}

export async function addCategory(categoryName: string, color: string) {
  try {
    const res = await prisma.category.create({
      data: {
        categoryName,
        color,
      },
    });

    return res;
  } catch (error) {
    return { error };
  }
}

export async function updateCategory(
  id: number,
  categoryName: string,
  color: string
) {
  try {
    const res = await prisma.category.update({
      where: {
        id,
      },

      data: {
        categoryName,
        color,
      },
    });

    return res;
  } catch (error) {
    return { error };
  }
}

export async function deleteCategory(id: number) {
  try {
    const res = await prisma.category.delete({
      where: {
        id,
      },
    });

    return res;
  } catch (error) {
    return { error };
  }
}
