import React, { useState, useEffect, useRef } from "react";
import MenuAPI from "../services/ApiMenu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteIcon from "@mui/icons-material/Delete"; // Icono de bote de basura
import AddIcon from "@mui/icons-material/Add"; // Icono de añadir
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import ConfirmationDialog from "./atoms/ConfirmationDialog";
import "./../styles/tree_view.css";
export default function Menu() {
  const [menuData, setMenuData] = useState([]);
  const [editingNodeId, setEditingNodeId] = useState(null);
  const [editedItemName, setEditedItemName] = useState("");
  const [originalItemName, setOriginalItemName] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Bandera para indicar si se está editando un elemento
  const [openConfirmation, setOpenConfirmation] = useState(false); // Estado para controlar la apertura del diálogo de confirmación
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [deleteNodeId, setDeleteNodeId] = useState(null);
  const [deletingItemName, setDeletingItemName] = useState(""); // Estado para almacenar el nombre del elemento que se está eliminando
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");
  const [newItemId, setNewItemId] = useState(null); // Estado para almacenar el ID del nuevo elemento
  const inputRef = useRef(null); // Referencia para el input de edición

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await MenuAPI.getMenuItems("menu-items");
      setMenuData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddSubmit = async () => {
    try {
      const data = {
        item_name: newItemName,
        url: newItemDescription,
      };

      await MenuAPI.addMenuItem(`menu-items/${newItemId}/add-item`, data);
      fetchData();
    } catch (error) {
      console.error("Error al actualizar elemento:", error);
    }
  };

  const handleEditSubmit = async () => {
    if (!isEditing) return; // Si no se está editando, no hacer nada
    // Verificar si el texto editado es diferente al texto original
    if (editedItemName !== originalItemName) {
      try {
        await MenuAPI.updateMenuItemText(
          `menu-items/${editingNodeId}/update-name`,
          editedItemName
        );
        console.log("Elemento actualizado con éxito:", editingNodeId);
        setEditingNodeId(null);
        setIsEditing(false); // Deshabilitar la edición después de enviar los cambios
        fetchData(); // Actualizar los datos del menú después de editar
      } catch (error) {
        console.error("Error al actualizar elemento:", error);
      }
    } else {
      // Si el texto no ha cambiado, simplemente cancela la edición
      handleCancelEdit();
    }
  };

  const handleDeleteSubmit = async () => {
    try {
      await MenuAPI.deleteMenuItem(`menu-items/${deleteNodeId}/delete-item`);
      console.log("Elemento eliminado con éxito:", deleteNodeId);
      setDeleteNodeId(null);
      setOpenDeleteConfirmation(false);
      fetchData();
    } catch (error) {
      console.error("Error al eliminar elemento:", error);
    }
  };

  const handleCancelEdit = () => {
    // Restaurar el texto original y deshabilitar la edición
    setEditingNodeId(null);
    setEditedItemName(originalItemName);
    setIsEditing(false);
  };

  const handleEditMenuItem = (nodeId, itemName) => {
    // Guardar el texto original antes de habilitar la edición
    setEditingNodeId(nodeId);
    setOriginalItemName(itemName);
    setEditedItemName(itemName);
    setIsEditing(true); // Indicar que se está editando un elemento
    // Enfocar el input de edición
    inputRef.current && inputRef.current.focus();
  };

  const handleConfirmation = () => {
    setOpenConfirmation(true);
  };

  const handleDeleteConfirmation = () => {
    setOpenDeleteConfirmation(true);
  };

  const handleDeleteMenuItem = (nodeId, itemName) => {
    setDeleteNodeId(nodeId);
    setDeletingItemName(itemName); // Almacena el nombre del elemento que se está eliminando
    handleDeleteConfirmation();
  };

  const handleAddConfirmation = (nodeId) => {
    setNewItemId(nodeId);
    setOpenAddModal(true);
  };

  const handleCloseConfirmation = (confirmed, actionType) => {
    console.log(confirmed, actionType);
    if (confirmed) {
      switch (actionType) {
        case "add":
          console.log("Agregar");
          console.log("ID del elemento:", newItemId);
          console.log("Texto del nuevo elemento:", newItemName);
          handleAddSubmit();
          break;
        case "edit":
          console.log("editar");
          handleEditSubmit(); // Ejecuta la función de edición
          break;
        case "delete":
          console.log("eliminar");
          handleDeleteSubmit(); // Ejecuta la función de eliminación
          break;
        default:
          console.error("Acción no reconocida");
      }
    } else {
      handleCancelEdit(); // Cancelar la edición si se cancela la confirmación
    }
    if (actionType === "edit") {
      setOpenConfirmation(false);
    } else if (actionType === "delete") {
      setOpenDeleteConfirmation(false);
    }
  };

  const renderTreeItems = (nodes, isRoot = true) =>
    nodes.map((node) => (
      <TreeItem
        classes={{ root: "tree-item" }}
        key={node.id}
        nodeId={node.id.toString()}
        label={
          <div className="treeitem-content">
            {editingNodeId === node.id ? (
              <input
                ref={inputRef}
                type="text"
                value={editedItemName}
                onChange={(e) => setEditedItemName(e.target.value)}
                onBlur={handleConfirmation}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleConfirmation();
                  } else if (e.key === "Escape") {
                    handleCancelEdit();
                  }
                }}
                autoFocus
              />
            ) : (
              <div
                className="treeitem-label"
                onDoubleClick={() =>
                  handleEditMenuItem(node.id, node.item_name)
                }
              >
                {node.item_name}
              </div>
            )}
            {node.children.length > 0 && ( // Renderizar el icono solo si el nodo tiene hijos
              <AddIcon
                className="treeitem-icon"
                onClick={(e) => {
                  e.stopPropagation(); // Detener la propagación del evento
                  handleAddConfirmation(node.id);
                }}
                style={{ cursor: "pointer", marginLeft: "5px" }}
              />
            )}
            <DeleteIcon
              className="treeitem-icon"
              onClick={(e) => {
                e.stopPropagation(); // Detener la propagación del evento
                handleDeleteMenuItem(node.id, node.item_name);
              }}
              style={{ cursor: "pointer", marginLeft: "5px" }}
            />
          </div>
        }
      >
        {Array.isArray(node.children)
          ? renderTreeItems(node.children, false) // Pasar false para indicar que no es un nodo raíz
          : null}
      </TreeItem>
    ));

  return (
    <>
      <TreeView
        classes={{ root: "treeview" }}
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        {renderTreeItems(menuData)}
      </TreeView>
      <ConfirmationDialog
        open={openConfirmation}
        setOpen={setOpenConfirmation}
        onConfirm={() => handleCloseConfirmation(true, "edit")}
        onCancel={() => handleCloseConfirmation(false, "edit")}
        title="Confirmación"
        content="¿Estás seguro de que deseas editar este elemento?"
      />
      <ConfirmationDialog
        open={openDeleteConfirmation}
        setOpen={setOpenDeleteConfirmation}
        onConfirm={() => handleCloseConfirmation(true, "delete")}
        onCancel={() => handleCloseConfirmation(false, "delete")}
        title="Confirmación"
        content={`¿Estás seguro de que deseas eliminar "${deletingItemName}"?`}
      />
      <ConfirmationDialog
        open={openAddModal}
        setOpen={setOpenAddModal}
        onConfirm={() => handleCloseConfirmation(true, "add")}
        onCancel={() => handleCloseConfirmation(false, "add")}
        title="Agregar nuevo elemento"
        content={
          <div>
            <div style={{ marginBottom: "10px" }}>
              <input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Ingrese el item"
              />
            </div>
            <div>
              <input
                type="text"
                value={newItemDescription}
                onChange={(e) => setNewItemDescription(e.target.value)}
                placeholder="Ingrese la URL"
              />
            </div>
          </div>
        }
      />
    </>
  );
}
