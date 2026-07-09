import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import NewSubCategoryForm from "@/components/application/settings/NewSubCategoryForm";
import { getMainCategories } from "@/data/categories";

const NewSubCategoryDialog = async () => {
  const categories = await getMainCategories();
  const haveCategories = categories.length > 0;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ New Sub Category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Sub Category Form</DialogTitle>
          <DialogDescription>
            {!haveCategories
              ? "You doesn't have any Main categories." +
                "Please Make sure to have at least one main category."
              : "Fill out the form below to add a new sub category card."}
          </DialogDescription>
        </DialogHeader>
        {haveCategories && (
          <div>
            <NewSubCategoryForm categories={categories} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewSubCategoryDialog;
