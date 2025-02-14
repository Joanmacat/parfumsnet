import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

export default function CustomizedPerfumeModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button className="bg-gradient-to-r from-rose-500 to-pink-400 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition" onPress={onOpen}>
        Create Your Perfume
      </Button>
      <Modal
        backdrop="blur"
        classNames={{
          backdrop: "bg-gradient-to-b from-rose-900/80 to-black/20 backdrop-blur-sm",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="bg-white rounded-xl shadow-xl p-6">
          {(onClose) => (
            <>
              <ModalHeader className="text-center text-2xl font-bold text-gray-800">Design Your Signature Scent</ModalHeader>
              <ModalBody className="text-gray-600 text-lg leading-relaxed">
                <p>
                  Unleash your creativity and craft a fragrance that is uniquely yours. 
                  Choose from a variety of exquisite notes to create a scent that 
                  matches your personality and style.
                </p>
              </ModalBody>
              <ModalFooter className="flex justify-center gap-4">
                <Button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition" onPress={onClose}>
                  Cancel
                </Button>
                <Button className="bg-rose-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-rose-600 transition" onPress={onClose}>
                  Start Creating
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}