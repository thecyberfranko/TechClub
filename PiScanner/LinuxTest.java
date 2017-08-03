import java.io.File;
import java.util.Scanner;
import javax.swing.filechooser.FileSystemView;


public class LinuxTest
{
    public static void getRoot() {
        FileSystemView fsv = FileSystemView.getFileSystemView();
        File[] deviceDir = new File("/media/").listFiles();
        for (File file: File.listRoots())
            System.out.printf("File: %s %s%n", file.getName(), fsv.getSystemTypeDescription(file));
    }

    public static void main(String[] args)
    {
        LinuxTest.getRoot();
    }
}
